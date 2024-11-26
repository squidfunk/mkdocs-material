# Analyzing Open Government Data with duckplyr – DuckDB

* Source: <https://duckdb.org/2024/10/09/analyzing-open-government-data-with-duckplyr.html>

# Analyzing Open Government Data with duckplyr

 *duckplyr*. [duckplyr](https://duckplyr.tidyverse.org/) is a high-performance drop-in replacement for dplyr, powered by DuckDB. You can read more about duckplyr in the [announcement blog post](https://duckdb.org/2024/04/02/duckplyr.html). In this post, we are going to walk through a challenging real-world use case with duckplyr. For those of you wishing to follow along, we have prepared a [Google Colab notebook](https://colab.research.google.com/drive/1PxvkZ4FpMNtP-CpKpz5hvH-xKgaYC3-S) with all the code snippets in this post. Timings reported below are also from Colab.

Like many government statistics agencies, New Zealand's “Stats NZ Tatauranga Aotearoa” thankfully provides some of the datasets they maintain as [Open Data for download](https://www.stats.govt.nz/large-datasets/csv-files-for-download/). The largest file available for download on that page contains “Age and sex by ethnic group (grouped total responses), for census usually resident population counts, 2006, 2013, and 2018 Censuses”, [CSV zipped file](https://www3.stats.govt.nz/2018census/Age-sex-by-ethnic-group-grouped-total-responses-census-usually-resident-population-counts-2006-2013-2018-Censuses-RC-TA-SA2-DHB.zip).

We can download that file (mirrored from our CDN, we don't want to DDoS poor Stats NZ) and unzip like so:

```
download.file("https://blobs.duckdb.org/nzcensus.zip", "nzcensus.zip")
unzip("nzcensus.zip")
```

Let's explore the CSV files in the zip and what their sizes are:

```
file.info(Sys.glob("*.csv"))["size"]
```

```
                               size
Data8277.csv              857672667
DimenLookupAge8277.csv         2720
DimenLookupArea8277.csv       65400
DimenLookupEthnic8277.csv       272
DimenLookupSex8277.csv           74
DimenLookupYear8277.csv          67
```

As we can see, there is one large (\~800 MB) `Data` file and a bunch of `Dimen...` dimension files. This is a fairly common data layout, sometimes called a [“star schema”](https://en.wikipedia.org/wiki/Star_schema). From this, it's clear there are some joins in our future. But first lets focus on the main file, `Data8277.csv`. Reading sizeable CSV files is not trivial and can be very frustrating. But enough whinging, as the Kiwis would say.

To start with, let's just have a quick look what the file looks like:

```
cat(paste(readLines("Data8277.csv", n=10), collapse="\n"))
```

```
Year,Age,Ethnic,Sex,Area,count
2018,000,1,1,01,795
2018,000,1,1,02,5067
2018,000,1,1,03,2229
2018,000,1,1,04,1356
2018,000,1,1,05,180
2018,000,1,1,06,738
2018,000,1,1,07,630
2018,000,1,1,08,1188
2018,000,1,1,09,2157
```

So far this looks rather tame, there seem to be five columns. Thankfully, they have names. From just eyeballing the column values, it looks like they are all numeric and even integer values. However, looks can be deceiving, and the columns `Age`, `Area`, `count` contain character values somewhere down the line. Fun fact: we have to wait till line 431 741 until the `Area` column contains a non-integer value. Clearly we need a good CSV parser. R has no shortage of CSV readers, for example the `readr` package contains a flexible CSV parser. Reading this file with `readr` takes about a minute (on Colab).

But let's now start using DuckDB and duckplyr. First, we install duckplyr (and DuckDB, which is a dependency):

```
install.packages("duckplyr")
duckdb:::sql("SELECT version()")
```

This command prints out the installed DuckDB version, as of this writing the latest version on [CRAN](https://cran.r-project.org/web/packages/duckdb/index.html) is 1.1.0. We can now use DuckDB's advanced data wrangling capabilities. First off, DuckDB contains probably the [world's most advanced CSV parser](https://duckdb.org/2023/10/27/csv-sniffer.html). For the extra curious, [here is a presentation on DuckDB's CSV parser](https://www.youtube.com/watch?v=YrqSp8m7fmk). We use DuckDB's CSV reader to only read the first 10 rows from the CSV file:

```
duckdb:::sql("FROM Data8277.csv LIMIT 10")
```

```
   Year Age Ethnic Sex Area count
1  2018 000      1   1   01   795
2  2018 000      1   1   02  5067
3  2018 000      1   1   03  2229
4  2018 000      1   1   04  1356
5  2018 000      1   1   05   180
6  2018 000      1   1   06   738
7  2018 000      1   1   07   630
8  2018 000      1   1   08  1188
9  2018 000      1   1   09  2157
10 2018 000      1   1   12   177
```

This only takes a few milliseconds because DuckDB's CSV reader produces results in a streaming fashion, and because we have only requested 10 rows we are done fairly quickly.

DuckDB can also print out the schema it detected from the CSV file using the `DESCRIBE` keyword:

```
duckdb:::sql("DESCRIBE FROM Data8277.csv")
```

```
  column_name column_type ...
1        Year      BIGINT ...
2         Age     VARCHAR ...
3      Ethnic      BIGINT ...
4         Sex      BIGINT ...
5        Area     VARCHAR ...
6       count     VARCHAR ...
```

We can see that we have correctly detected the various data types for the columns. We can use the `SUMMARIZE` keyword to compute various summary statistics for all the columns in the file:

```
duckdb:::sql("SUMMARIZE FROM Data8277.csv")
```

This will take a little bit longer, but the results are very interesting:

```
# A tibble: 6 × 12
  column_name column_type min   max     approx_unique avg      std   q25   q50  
  <chr>       <chr>       <chr> <chr>           <dbl> <chr>    <chr> <chr> <chr>
1 Year        BIGINT      2006  2018                3 2012.33… 4.92… 2006  2013 
2 Age         VARCHAR     000   999999            149 NA       NA    NA    NA   
3 Ethnic      BIGINT      1     9999               11 930.545… 2867… 3     6    
4 Sex         BIGINT      1     9                   3 4.0      3.55… 1     2    
5 Area        VARCHAR     001   DHB9999          2048 NA       NA    NA    NA   
6 count       VARCHAR     ..C   9999            16825 NA       NA    NA    NA   
# ℹ 3 more variables: q75 <chr>, count <dbl>, null_percentage <dbl>
```

This will show again the column names and their types, but also the summary statistics for minimum and maximum value, approximate count of unique values, average, standard deviations, 25, 50, and 75 quantiles, and percentage of NULL/NA values. So one gets a pretty good overview of what the data is like.

But we're not here to ogle summary statistics, we want to do actual analysis of the data. In this use case, we would like to compute the number of non-Europeans between 20 and 40 that live in the Auckland area using the 2018 census data and the results should be grouped by sex. To do so, we need to join the dimension CSV files with the main data file in order to properly filter the dimension values. In SQL, the lingua franca of large-scale data analysis, this looks like this:

We first join everything together:

```
FROM 'Data8277.csv' data
JOIN 'DimenLookupAge8277.csv' age ON data.Age = age.Code
JOIN 'DimenLookupArea8277.csv' area ON data.Area = area.Code
JOIN 'DimenLookupEthnic8277.csv' ethnic ON data.Ethnic = ethnic.Code
JOIN 'DimenLookupSex8277.csv' sex ON data.Sex = sex.Code
JOIN 'DimenLookupYear8277.csv' year ON data.Year = year.Code
```

Next, we use the `SELECT` projection to perform some basic renames and data cleaning:

```
SELECT
    year.Description year_,
    area.Description area_,
    ethnic.Description ethnic_,
    sex.Description sex_,
    try_cast(replace(age.Description, ' years', '') AS INTEGER) age_,
    try_cast(data.count AS INTEGER) count_
```

The data set contains various totals, so we remove them before proceeding:

```
WHERE count_ > 0
  AND age_ IS NOT NULL
  AND area_ NOT LIKE 'Total%'
  AND ethnic_ NOT LIKE 'Total%'
  AND sex_ NOT LIKE 'Total%'
```

We wrap the previous statements as a common-table-expression `expanded_cleaned_data`, and we can then compute the actual aggregation using DuckDB

```
SELECT sex_, sum(count_) group_count
FROM expanded_cleaned_data
WHERE age_ BETWEEN 20 AND 40
  AND area_ LIKE 'Auckland%'
  AND ethnic_ <> 'European'
  AND year_ = 2018
GROUP BY sex_
ORDER BY sex_
```

This takes ca. 20s on the limited Colab free tier compute. The result is:

```
    sex_ group_count
1 Female      398556
2   Male      397326
```

So far, so good. However, writing SQL queries is not for everyone. The ergonomics of creating SQL strings in an interactive data analysis environment like R are questionable to say the least. Frameworks like `dplyr` have shown how data wrangling ergonomics can be massively improved. Let's express our analysis using dplyr then after first reading the data into RAM from CSV:

```
library(dplyr)

data   <- readr::read_csv("Data8277.csv")
age    <- readr::read_csv("DimenLookupAge8277.csv")
area   <- readr::read_csv("DimenLookupArea8277.csv")
ethnic <- readr::read_csv("DimenLookupEthnic8277.csv")
sex    <- readr::read_csv("DimenLookupSex8277.csv")
year   <- readr::read_csv("DimenLookupYear8277.csv")

expanded_cleaned_data <- data |>
  filter(grepl("^\\d+$", count)) |>
  mutate(count_ = as.integer(count)) |>
  filter(count_ > 0) |>
  inner_join(
    age |>
      filter(grepl("^\\d+ years$", Description)) |>
      mutate(age_ = as.integer(Code)),
    join_by(Age == Code)
  ) |>
  inner_join(area |>
    mutate(area_ = Description) |>
    filter(!grepl("^Total", area_)), join_by(Area == Code)) |>
  inner_join(ethnic |>
    mutate(ethnic_ = Description) |>
    filter(!grepl("^Total", ethnic_)), join_by(Ethnic == Code)) |>
  inner_join(sex |>
    mutate(sex_ = Description) |>
    filter(!grepl("^Total", sex_)), join_by(Sex == Code)) |>
  inner_join(year |> mutate(year_ = Description), join_by(Year == Code))

# create final aggregation, still completely lazily
twenty_till_fourty_non_european_in_auckland_area <-
  expanded_cleaned_data |>
  filter(
    age_ >= 20, age_ <= 40,
    grepl("^Auckland", area_),
    year_ == "2018",
    ethnic_ != "European"
  ) |>
  summarise(group_count = sum(count_), .by = sex_) |> arrange(sex_)

print(twenty_till_fourty_non_european_in_auckland_area)
```

This looks nicer and completes in ca. one minute, but there are several hidden issues. First, we read the *entire* dataset into RAM. While for this dataset this is likely possible because most computers have more than 1 GB of RAM, this will of course not work for larger datasets. Then, we execute a series of dplyr verbs. However, dplyr executes those eagerly, meaning it does not holistically optimize the sequence of verbs. For example, it cannot see that we are filtering out all non-European ethnicities in the last step and happily computes all of those for the intermediate result. The same happens with survey years that are not 2018, only in the last step we filter those out. We have computed an expensive join on all other years for nothing. Depending on data distributions, this can be extremely wasteful. And yes, it is possible to manually move the filters around but this is tedious and error-prone. At least the result is exactly the same as the SQL version above:

```
# A tibble: 2 × 2
  sex_   group_count
  <chr>        <int>
1 Female      398556
2 Male        397326
```

Now we switch the exact same script over to duckplyr. Instead of reading the CSV files into RAM entirely using `readr`, we instead use the `duckplyr_df_from_csv` function from `duckplyr`:

```
library("duckplyr")

data   <- duckplyr_df_from_csv("Data8277.csv")
age    <- duckplyr_df_from_csv("DimenLookupAge8277.csv")
area   <- duckplyr_df_from_csv("DimenLookupArea8277.csv")
ethnic <- duckplyr_df_from_csv("DimenLookupEthnic8277.csv")
sex    <- duckplyr_df_from_csv("DimenLookupSex8277.csv")
year   <- duckplyr_df_from_csv("DimenLookupYear8277.csv")
```

This takes exactly 0 seconds, because duckplyr is not actually doing much. We detect the schema of the CSV files using our award-winning “sniffer”, and create the six placeholder objects for each of those files. Part of the unique design of duckplyr is that those objects are “Heisenbergian”, they behave like completely normal R `data.frame`s once they are treated as such, but they can *also* act as lazy evaluation placeholders when they are passed to downstream analysis steps. This is made possible by a little-known R feature known as `ALTREP` which allows R vectors to be computed on-demand among other things.

Now we re-run the exact same dplyr pipeline as above. Only this time we are “done” in less than a second. This is because all we have done is *lazily* constructing a so-called relation tree which encapsulates the entirety of the transformations. This allows *holistic* optimization, for example pushing the year and ethnicity all the way down to the reading of the CSV file *before* joining. We can also eliminate the reading of columns that are not used in the query at all.

Only when we finally print the result

```
print(twenty_till_fourty_non_european_in_auckland_area)
```

actual computation is triggered. This finishes in the same time as the hand-rolled SQL query above, only that this time we had a much more pleasant experience from using the dplyr syntax. And, thankfully, the result is still exactly the same.

This use case was also presented as part of [my keynote at this year's posit::conf](https://www.youtube.com/watch?v=GELhdezYmP0):

[YouTube video player](https://www.youtube.com/embed/GELhdezYmP0?si=suO9fC652ooAZKOq)

Finally, we should note that duckplyr is still being developed. We have taking great care in not breaking anything and will fall back on the existing dplyr implementation if anything cannot be run in DuckDB (yet). But we would love to [hear from you](https://github.com/tidyverse/duckplyr/issues) if anything does not work as expected.
