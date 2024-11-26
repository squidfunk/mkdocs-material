# 1️⃣🐝🏎️🦆 (1BRC in SQL with DuckDB)

* Source: <https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/>

**Why should the Java folk have all the fun?!**

My friend and colleague [Gunnar Morling](https://twitter.com/gunnarmorling/) [launched a fun challenge](https://www.morling.dev/blog/one-billion-row-challenge/) this week: how fast can you aggregate and summarise a billion rows of data? Cunningly named The One Billion Row Challenge (1BRC for short), it’s aimed at Java coders to look at new features in the language and optimisation techniques.

Not being a Java coder myself, and seeing how the challenge has already unofficially spread to other communities [including Rust and Python](https://www.reddit.com/r/rust/comments/18ws370/optimizing_a_one_billion_row_challenge_in_rust/) I thought I’d join in the fun using what I know best: SQL.

## Setup [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#setup)

*I’m running this on my M1 Macbook.*

1. Fork [the repository](https://github.com/gunnarmorling/1brc) and clone it locally

2. Make sure you’ve got Java 21 (whether coding in it or not, you need it for generating the billion rows of data). I use [sdkman](https://sdkman.io/jdks) because it’s easy enough for even someone like me to use ;)

   ```bash
   $ sdk install java 21.0.1-zulu
   $ sdk use java 21.0.1-zulu
   ```

3. Build the test data generator

   ```bash
   $ ./mvnw clean verify
   ```

4. Generate the test data—you can start smaller if you want by using a value other than 1B :)

   ```bash
   $ ./create_measurements.sh 1000000000
   ```

   This will take several minutes to run. Once done you’ll have a 13G file to work with:

   ```bash
   $ ls -hl measurements.txt
   -rw-r--r--@ 1 rmoff  staff    13G  3 Jan 11:36 measurements.txt
   ```

5. Make sure you’ve got DuckDB installed - `brew install duckdb` is your friend if not.

## Load the data into DuckDB [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#load-the-data-into-duckdb)

I’ll start by showing you the steps that I went through to put this together, and then how to run it all in one go.

The first thing I did was read the CSV file into a DuckDB table. This is in-memory; whilst you can save it as a native DuckDB database I didn’t since the reading of the CSV file is part of the timed challenge.

To get the CSV file into DuckDB I used the [`read_csv_auto`](https://duckdb.org/docs/data/csv/overview) function. Let’s check that this works as expected:

```sql
🟡◗ SELECT * FROM READ_CSV_AUTO('measurements.txt') LIMIT 5;
┌──────────────────┬─────────┐
│     column0      │ column1 │
│     varchar      │ double  │
├──────────────────┼─────────┤
│ Lodwar           │    44.8 │
│ Lhasa            │     2.6 │
│ Sokoto           │    18.2 │
│ Moncton          │    -6.2 │
│ Lake Havasu City │    16.5 │
└──────────────────┴─────────┘
```

Note that DuckDB infers the datatypes correctly. We can provide some column names and be explicit about the data types by using the `columns` parameter of `READ_CSV`:

```sql
🟡◗ SELECT * FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';') LIMIT 5;
┌──────────────────┬─────────────┐
│   station_name   │ measurement │
│     varchar      │   double    │
├──────────────────┼─────────────┤
│ Lodwar           │        44.8 │
│ Lhasa            │         2.6 │
│ Sokoto           │        18.2 │
│ Moncton          │        -6.2 │
│ Lake Havasu City │        16.5 │
└──────────────────┴─────────────┘
```

Let’s get this loaded into a table so that we can work with it more easily:

```sql
🟡◗ CREATE OR REPLACE TABLE measurements AS
        SELECT * FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';') LIMIT 2048;
```

**NOTE** I am still using [`LIMIT`](https://duckdb.org/docs/sql/query_syntax/limit) so that we don’t jump into the 1B rows just yet whilst we figure things out. There’s also [`SAMPLE`](https://duckdb.org/docs/sql/samples) but this reads the whole file first—nicer for accurate samples, but not so helpful when we just want *any* data so long as it’s quick.

## Perform the calculations [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#perform-the-calculations)

Aggregates are the bread-and-butter of SQL, and are driven by the [`GROUP BY`](https://duckdb.org/docs/sql/query_syntax/groupby) clause:

```sql
🟡◗ SELECT station_name, 
           MIN(measurement),
           AVG(measurement),
           MAX(measurement)
    FROM measurements 
    GROUP BY station_name
    LIMIT 5;

┌──────────────┬──────────────────┬────────────────────┬──────────────────┐
│ station_name │ min(measurement) │  avg(measurement)  │ max(measurement) │
│   varchar    │      double      │       double       │      double      │
├──────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Lodwar       │             16.9 │ 31.933333333333334 │             44.8 │
│ Chongqing    │              4.7 │              18.85 │             33.0 │
│ Stockholm    │             -0.1 │  8.116666666666667 │             18.1 │
│ Zürich       │              8.1 │ 15.633333333333335 │             20.6 │
│ Kampala      │              9.4 │              18.14 │             31.1 │
└──────────────┴──────────────────┴────────────────────┴──────────────────┘
```

Note the precision shown in the average column, and the 1BRC spec does say:

> rounded to one fractional digit

so let’s do this, and at the same time alias the calculated fields to useful names:

```sql
🟡◗ SELECT station_name, 
           MIN(measurement) AS min_measurement,
           CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
           MAX(measurement) AS max_measurement
    FROM measurements 
    GROUP BY station_name
    LIMIT 5;

┌──────────────┬─────────────────┬──────────────────┬─────────────────┐
│ station_name │ min_measurement │ mean_measurement │ max_measurement │
│   varchar    │     double      │   decimal(8,1)   │     double      │
├──────────────┼─────────────────┼──────────────────┼─────────────────┤
│ Lhasa        │            -1.3 │             11.9 │            31.8 │
│ Alexandria   │            11.0 │             20.0 │            31.6 │
│ Bulawayo     │            17.5 │             24.7 │            32.3 │
│ Guadalajara  │            11.4 │             23.1 │            36.4 │
│ Da Nang      │            15.3 │             26.0 │            39.3 │
└──────────────┴─────────────────┴──────────────────┴─────────────────┘
```

## Formatting the output [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#formatting-the-output)

The 1BRC spec says that the output needs to be

> * sorted alphabetically by station name
> * the result values per station in the format \<min>/\<mean>/\<max>
> * rounded to one fractional digit

With the example given as:

```
{Abha=-23.0/18.0/59.2, Abidjan=-16.2/26.0/67.3, Abéché=-10.0/29.4/69.0, Accra=-10.1/26.4/66.4, Addis Ababa=-23.7/16.0/67.0, Adelaide=-27.8/17.3/58.5, ...}
```

We fixed the precision above, but what about emitting a pseudo-Java output like shown? For that we’ll jump through a few hoops.

Using the `||` shorthand for [`CONCAT`](https://duckdb.org/docs/sql/functions/char) we can append the `=` to the station name, and [`CONCAT_WS`](https://duckdb.org/docs/sql/functions/char) the measurements separated by a `/`. To keep things clean I’m going to use a [common table expressions (CTE)](https://duckdb.org/docs/sql/query_syntax/with):

```sql
🟡◗ WITH src AS (SELECT station_name, 
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM measurements 
            GROUP BY station_name
            LIMIT 5)
    SELECT station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement)
    FROM src;

┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ ((station_name || '=') || concat_ws('/', min_measurement, mean_measurement, max_measurement)) │
│                                            varchar                                            │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ Lodwar=16.9/31.9/44.8                                                                         │
│ Chongqing=4.7/18.9/33.0                                                                       │
│ Stockholm=-0.1/8.1/18.1                                                                       │
│ Zürich=8.1/15.6/20.6                                                                          │
│ Kampala=9.4/18.1/31.1                                                                         │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Now we can pivot this into a single row, using the `LIST` function and `LIST_SORT` to sort it. *I’m not using `ORDER BY` for a reason that will become clear shortly.*

```sql
🟡◗ WITH src AS (SELECT station_name, 
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM measurements 
            GROUP BY station_name
            LIMIT 5)
    SELECT LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement)))
    FROM src;

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│     list_sort(list(((station_name || '=') || concat_ws('/', min_measurement, mean_measurement, max_measurement))))     │
│                                                       varchar[]                                                        │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [Chongqing=4.7/18.9/33.0, Kampala=9.4/18.1/31.1, Lodwar=16.9/31.9/44.8, Stockholm=-0.1/8.1/18.1, Zürich=8.1/15.6/20.6] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Finally, we’ll take this `LIST` (which is synonymous with Postgres’ `ARRAY` type) and convert it back to a string for our output using [`array_to_string`](https://duckdb.org/docs/sql/functions/nested#array_to_string). It’s this additional function which is why I need to use `LIST_SORT` rather than `ORDER_BY`—if I used the latter I’d need another CTE to wrap the LIST.

```sql
🟡◗ WITH src AS (SELECT station_name, 
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM measurements 
            GROUP BY station_name
            LIMIT 5)
    SELECT '{' || 
            ARRAY_TO_STRING(LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement))),', ') ||
            '}' AS "1BRC"
    FROM src;

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                          1BRC                                                          │
│                                                        varchar                                                         │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ {Chongqing=4.7/18.9/33.0, Kampala=9.4/18.1/31.1, Lodwar=16.9/31.9/44.8, Stockholm=-0.1/8.1/18.1, Zürich=8.1/15.6/20.6} │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Wrapping it all up (with some timings too) [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#wrapping-it-all-up-with-some-timings-too)

Here’s the final SQL file, including some useful DuckDB CLI settings

```sql
.timer on
.mode ascii
.echo on

-- Load the data
CREATE OR REPLACE TABLE measurements AS
        SELECT * FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';');

-- Run calculations
WITH src AS (SELECT station_name,
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM measurements
            GROUP BY station_name)
    SELECT '{' ||
            ARRAY_TO_STRING(LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement))),', ') ||
            '}' AS "1BRC"
    FROM src;

.quit
```

Note that the `LIMIT` clause has been removed so the full 1B rows will be loaded.

Saving this as 1brc.sql and running it gives this:

```bash
$ /usr/bin/time -p duckdb -no-stdin -init 1brc.sql
-- Loading resources from 1brc.sql

-- Load the data
CREATE OR REPLACE TABLE measurements AS
        SELECT * FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';');
100% ▕████████████████████████████████████████████████████████████▏
Run Time (s): real 27.481 user 208.918956 sys 5.429126

-- Run calculations
WITH src AS (SELECT station_name,
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM measurements
            GROUP BY station_name)
    SELECT '{' ||
            ARRAY_TO_STRING(LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement))),', ') ||
            '}' AS "1BRC"
    FROM src;
100% ▕████████████████████████████████████████████████████████████▏
1BRC{Abha=-33.0/18.0/69.2, Abidjan=-24.4/26.0/75.4, Abéché=-21.1/29.4/77.1, Accra=-25.1/26.4/79.0, Addis Ababa=-33.6/16.0/66.8, Adelaide=-33.4/17.3/68.5, Aden=-19.3/29.1/77.9, Ahvaz=-24.1/25.4/74.0, Albuquerque=-33.5/14.0/61.8, Alexandra=-39.7/11.0/63.7, Alexandria=-30.2/20.0/74.4, Algiers=-39.2/18.2/68.1, Alice Springs=-32.5/21.0/67.6, Almaty=-37.4/10.0/59.0, Amsterdam=-39.8/10.2/60.6, Anadyr=-59.6/-6.9/42.6, Anchorage=-45.3/2.8/53.4, Andorra la Vella=-41.5/9.8/59.4, Ankara=-41.1/12.0/60.7, Antananarivo=-31.3/17.9/69.2, Antsiranana=-26.0/25.2/74.4, Arkhangelsk=-45.8/1.3/58.6, Ashgabat=-34.8/17.1/68.5, Asmara=-32.4/15.6/65.1, Assab=-23.4/30.5/81.7, Astana=-46.4/3.5/52.5, Athens=-31.6/19.2/68.3, Atlanta=-33.1/17.0/65.3, Auckland=-33.6/15.2/62.4, Austin=-27.3/20.7/67.3, Baghdad=-29.0/22.8/73.4, Baguio=-29.6/19.5/69.2, Baku=-31.6/15.1/63.3, Baltimore=-37.3/13.1/61.8, Bamako=-22.4/27.8/78.7, Bangkok=-25.7/28.6/78.4, Bangui=-23.0/26.0/75.6, Banjul=-25.6/26.0/71.7, Barcelona=-31.3/18.2/65.3, Bata=-22.5/25.1/80.4, Batumi=-33.3/14.0/63.0, Beijing=-34.5/12.9/63.9, Beirut=-28.6/20.9/70.9, Belgrade=-36.0/12.5/60.5, Belize City=-26.4/26.7/75.2, Benghazi=-33.9/19.9/72.9, Bergen=-42.5/7.7/54.3, Berlin=-37.6/10.3/61.3, Bilbao=-36.5/14.7/65.9, Birao=-25.7/26.5/76.0, Bishkek=-38.9/11.3/59.6, Bissau=-21.0/27.0/75.0, Blantyre=-26.3/22.2/72.8, Bloemfontein=-34.3/15.6/65.8, Boise=-37.2/11.4/59.2, Bordeaux=-35.1/14.2/64.4, Bosaso=-21.1/30.0/82.5, Boston=-42.1/10.9/61.9, Bouaké=-24.0/26.0/75.9, Bratislava=-38.7/10.5/62.3, Brazzaville=-26.6/25.0/71.4, Bridgetown=-22.3/27.0/79.8, Brisbane=-30.4/21.4/71.4, Brussels=-39.1/10.5/60.7, Bucharest=-39.9/10.8/60.0, Budapest=-37.8/11.3/63.8, Bujumbura=-25.6/23.8/86.6, Bulawayo=-29.9/18.9/71.8, Burnie=-36.1/13.1/63.2, Busan=-36.8/15.0/64.3, Cabo San Lucas=-26.0/23.9/70.9, Cairns=-23.1/25.0/74.6, Cairo=-27.2/21.4/71.1, Calgary=-43.0/4.4/54.6, Canberra=-34.8/13.1/66.4, Cape Town=-33.0/16.2/64.1, Changsha=-34.1/17.4/68.0, Charlotte=-37.2/16.1/66.0, Chiang Mai=-22.3/25.8/72.7, Chicago=-37.6/9.8/63.3, Chihuahua=-29.6/18.6/72.5, Chittagong=-23.0/25.9/75.1, Chișinău=-35.3/10.2/58.3, Chongqing=-35.9/18.6/70.6, Christchurch=-40.6/12.2/63.0, City of San Marino=-44.6/11.8/61.8, Colombo=-21.7/27.4/74.9, Columbus=-34.7/11.7/61.1, Conakry=-25.6/26.4/75.7, Copenhagen=-40.2/9.1/58.4, Cotonou=-22.8/27.2/78.5, Cracow=-42.1/9.3/62.6, Da Lat=-31.1/17.9/65.7, Da Nang=-23.9/25.8/73.5, Dakar=-25.3/24.0/77.6, Dallas=-33.4/19.0/69.6, Damascus=-32.4/17.0/66.5, Dampier=-23.7/26.4/76.5, Dar es Salaam=-32.1/25.8/72.0, Darwin=-25.5/27.6/80.6, Denpasar=-26.2/23.7/71.8, Denver=-41.5/10.4/59.5, Detroit=-38.6/10.0/62.4, Dhaka=-22.8/25.9/76.4, Dikson=-62.7/-11.1/39.0, Dili=-26.0/26.6/78.4, Djibouti=-19.2/29.9/79.6, Dodoma=-31.6/22.7/71.4, Dolisie=-28.8/24.0/75.4, Douala=-21.4/26.7/79.6, Dubai=-22.8/26.9/75.0, Dublin=-44.0/9.8/59.5, Dunedin=-42.7/11.1/64.8, Durban=-29.8/20.6/67.6, Dushanbe=-36.0/14.7/64.1, Edinburgh=-38.0/9.3/60.4, Edmonton=-45.1/4.2/57.7, El Paso=-34.0/18.1/65.6, Entebbe=-28.2/21.0/68.8, Erbil=-28.7/19.5/68.4, Erzurum=-59.1/5.1/52.7, Fairbanks=-53.7/-2.3/49.5, Fianarantsoa=-29.2/17.9/68.1, Flores,  Petén=-26.1/26.4/76.1, Frankfurt=-36.8/10.6/59.0, Fresno=-35.2/17.9/66.9, Fukuoka=-30.4/17.0/66.5, Gaborone=-26.4/21.0/71.1, Gabès=-31.9/19.5/72.1, Gagnoa=-21.3/26.0/75.6, Gangtok=-32.2/15.2/64.0, Garissa=-20.1/29.3/79.5, Garoua=-22.2/28.3/81.5, George Town=-20.6/27.9/76.6, Ghanzi=-28.2/21.4/70.9, Gjoa Haven=-65.2/-14.4/35.7, Guadalajara=-28.3/20.9/79.5, Guangzhou=-33.5/22.4/73.1, Guatemala City=-31.2/20.4/71.3, Halifax=-47.6/7.5/53.9, Hamburg=-42.7/9.7/60.2, Hamilton=-36.6/13.8/63.5, Hanga Roa=-27.6/20.5/69.3, Hanoi=-24.9/23.6/74.1, Harare=-33.0/18.4/69.0, Harbin=-45.9/5.0/55.5, Hargeisa=-30.0/21.7/72.5, Hat Yai=-25.0/27.0/79.0, Havana=-24.8/25.2/75.7, Helsinki=-43.1/5.9/56.2, Heraklion=-32.4/18.9/69.0, Hiroshima=-33.9/16.3/70.1, Ho Chi Minh City=-24.0/27.4/84.4, Hobart=-38.7/12.7/63.5, Hong Kong=-26.6/23.3/72.2, Honiara=-25.5/26.5/75.4, Honolulu=-25.8/25.4/73.5, Houston=-28.6/20.8/69.1, Ifrane=-36.7/11.4/61.5, Indianapolis=-37.9/11.8/63.6, Iqaluit=-57.0/-9.3/41.7, Irkutsk=-48.5/1.0/48.6, Istanbul=-33.4/13.9/60.6, Jacksonville=-28.2/20.3/69.9, Jakarta=-21.9/26.7/76.4, Jayapura=-25.0/27.0/75.5, Jerusalem=-31.2/18.3/67.6, Johannesburg=-35.3/15.5/66.9, Jos=-28.9/22.8/71.8, Juba=-20.9/27.8/79.4, Kabul=-36.1/12.1/61.8, Kampala=-28.1/20.0/69.1, Kandi=-22.0/27.7/76.9, Kankan=-24.0/26.5/74.6, Kano=-21.3/26.4/79.3, Kansas City=-40.6/12.5/62.8, Karachi=-25.3/26.0/81.8, Karonga=-22.9/24.4/72.4, Kathmandu=-32.2/18.3/66.6, Khartoum=-23.2/29.9/80.7, Kingston=-20.5/27.4/82.6, Kinshasa=-25.0/25.3/74.0, Kolkata=-24.9/26.7/73.9, Kuala Lumpur=-25.9/27.3/76.2, Kumasi=-23.1/26.0/74.6, Kunming=-36.1/15.7/67.9, Kuopio=-47.0/3.4/56.9, Kuwait City=-25.8/25.7/74.1, Kyiv=-40.6/8.4/62.5, Kyoto=-36.9/15.8/62.4, La Ceiba=-22.1/26.2/76.5, La Paz=-27.7/23.7/71.5, Lagos=-23.9/26.8/76.1, Lahore=-28.4/24.3/77.3, Lake Havasu City=-28.0/23.7/77.1, Lake Tekapo=-37.7/8.7/62.3, Las Palmas de Gran Canaria=-29.0/21.2/69.9, Las Vegas=-28.4/20.3/72.0, Launceston=-36.5/13.1/62.6, Lhasa=-44.2/7.6/59.7, Libreville=-22.8/25.9/75.4, Lisbon=-29.6/17.5/65.5, Livingstone=-29.2/21.8/70.9, Ljubljana=-39.0/10.9/59.3, Lodwar=-24.5/29.3/75.7, Lomé=-20.2/26.9/75.8, London=-36.4/11.3/61.3, Los Angeles=-29.4/18.6/67.7, Louisville=-36.7/13.9/64.1, Luanda=-23.9/25.8/73.5, Lubumbashi=-28.5/20.8/70.1, Lusaka=-26.5/19.9/71.8, Luxembourg City=-39.0/9.3/60.7, Lviv=-42.8/7.8/56.1, Lyon=-39.8/12.5/63.9, Madrid=-35.0/15.0/66.5, Mahajanga=-23.6/26.3/78.7, Makassar=-23.5/26.7/77.7, Makurdi=-21.5/26.0/76.8, Malabo=-21.6/26.3/75.2, Malé=-23.3/28.0/76.1, Managua=-20.8/27.3/75.9, Manama=-24.0/26.5/74.2, Mandalay=-23.5/28.0/76.8, Mango=-20.7/28.1/76.8, Manila=-20.7/28.4/75.6, Maputo=-29.1/22.8/78.7, Marrakesh=-29.3/19.6/70.9, Marseille=-31.0/15.8/66.9, Maun=-28.9/22.4/69.7, Medan=-24.2/26.5/76.0, Mek'ele=-29.4/22.7/73.3, Melbourne=-38.3/15.1/66.1, Memphis=-33.5/17.2/67.1, Mexicali=-24.0/23.1/71.9, Mexico City=-32.0/17.5/71.3, Miami=-29.6/24.9/75.9, Milan=-33.2/13.0/60.8, Milwaukee=-40.1/8.9/59.1, Minneapolis=-41.5/7.8/56.3, Minsk=-42.8/6.7/54.2, Mogadishu=-21.8/27.1/76.8, Mombasa=-22.8/26.3/76.9, Monaco=-38.1/16.4/66.9, Moncton=-42.1/6.1/59.2, Monterrey=-27.4/22.3/70.4, Montreal=-41.6/6.8/57.2, Moscow=-46.6/5.8/56.8, Mumbai=-23.1/27.1/76.1, Murmansk=-52.9/0.6/51.2, Muscat=-20.6/28.0/74.0, Mzuzu=-31.0/17.7/66.6, N'Djamena=-21.9/28.3/75.6, Naha=-26.3/23.1/72.2, Nairobi=-32.5/17.8/69.6, Nakhon Ratchasima=-24.9/27.3/75.3, Napier=-35.8/14.6/64.5, Napoli=-38.7/15.9/64.9, Nashville=-34.2/15.4/67.1, Nassau=-24.2/24.6/71.8, Ndola=-29.9/20.3/70.9, New Delhi=-23.3/25.0/77.2, New Orleans=-29.8/20.7/72.1, New York City=-35.6/12.9/62.6, Ngaoundéré=-28.1/22.0/69.9, Niamey=-20.6/29.3/78.0, Nicosia=-29.4/19.7/68.2, Niigata=-36.7/13.9/69.4, Nouadhibou=-29.9/21.3/73.9, Nouakchott=-25.6/25.7/73.4, Novosibirsk=-47.8/1.7/50.6, Nuuk=-53.1/-1.4/49.1, Odesa=-39.9/10.7/60.5, Odienné=-23.3/26.0/76.2, Oklahoma City=-34.6/15.9/66.9, Omaha=-38.2/10.6/65.6, Oranjestad=-22.1/28.1/81.0, Oslo=-44.5/5.7/54.8, Ottawa=-44.5/6.6/57.8, Ouagadougou=-25.9/28.3/81.2, Ouahigouya=-20.0/28.6/77.4, Ouarzazate=-30.3/18.9/73.1, Oulu=-45.4/2.7/54.9, Palembang=-24.7/27.3/75.9, Palermo=-30.1/18.5/71.7, Palm Springs=-26.4/24.5/78.2, Palmerston North=-37.3/13.2/64.8, Panama City=-22.3/28.0/75.6, Parakou=-23.9/26.8/76.2, Paris=-38.3/12.3/62.7, Perth=-30.1/18.7/72.0, Petropavlovsk-Kamchatsky=-47.2/1.9/49.2, Philadelphia=-37.3/13.2/64.6, Phnom Penh=-18.4/28.3/79.7, Phoenix=-25.5/23.9/73.4, Pittsburgh=-35.0/10.8/60.8, Podgorica=-34.0/15.3/70.7, Pointe-Noire=-25.7/26.1/76.1, Pontianak=-24.3/27.7/76.5, Port Moresby=-21.6/26.9/77.9, Port Sudan=-20.4/28.4/78.1, Port Vila=-26.1/24.3/74.7, Port-Gentil=-23.9/26.0/76.0, Portland (OR)=-35.6/12.4/59.7, Porto=-35.5/15.7/63.8, Prague=-42.2/8.4/61.1, Praia=-26.0/24.4/75.6, Pretoria=-29.0/18.2/67.7, Pyongyang=-42.5/10.8/59.3, Rabat=-31.2/17.2/68.7, Rangpur=-21.9/24.4/74.3, Reggane=-20.3/28.3/79.2, Reykjavík=-49.4/4.3/53.5, Riga=-40.5/6.2/57.0, Riyadh=-23.1/26.0/74.0, Rome=-31.8/15.2/68.6, Roseau=-22.8/26.2/76.1, Rostov-on-Don=-41.8/9.9/57.2, Sacramento=-39.3/16.3/67.2, Saint Petersburg=-42.6/5.8/56.4, Saint-Pierre=-43.4/5.7/56.2, Salt Lake City=-35.3/11.6/61.8, San Antonio=-29.8/20.8/71.2, San Diego=-31.1/17.8/66.1, San Francisco=-35.3/14.6/60.4, San Jose=-33.0/16.4/65.1, San José=-26.4/22.6/69.7, San Juan=-20.5/27.2/77.3, San Salvador=-25.7/23.1/75.1, Sana'a=-30.8/20.0/68.6, Santo Domingo=-23.6/25.9/76.6, Sapporo=-38.9/8.9/61.8, Sarajevo=-45.0/10.1/59.4, Saskatoon=-47.3/3.3/51.5, Seattle=-38.1/11.3/60.6, Seoul=-36.0/12.5/61.2, Seville=-32.2/19.2/73.1, Shanghai=-35.1/16.7/67.0, Singapore=-23.7/27.0/81.9, Skopje=-35.5/12.4/64.3, Sochi=-34.3/14.2/65.2, Sofia=-38.2/10.6/61.6, Sokoto=-23.1/28.0/73.2, Split=-32.7/16.1/62.2, St. John's=-44.1/5.0/56.4, St. Louis=-41.2/13.9/64.2, Stockholm=-45.5/6.6/55.9, Surabaya=-23.4/27.1/76.1, Suva=-28.1/25.6/78.8, Suwałki=-45.4/7.2/62.3, Sydney=-30.1/17.7/68.8, Ségou=-23.2/28.0/75.1, Tabora=-24.7/23.0/73.7, Tabriz=-36.8/12.6/61.9, Taipei=-24.6/23.0/74.8, Tallinn=-42.6/6.4/60.7, Tamale=-23.3/27.9/77.7, Tamanrasset=-28.7/21.7/71.7, Tampa=-34.8/22.9/70.4, Tashkent=-32.2/14.8/64.3, Tauranga=-38.9/14.8/66.9, Tbilisi=-34.6/12.9/66.2, Tegucigalpa=-27.1/21.7/74.1, Tehran=-33.5/17.0/73.6, Tel Aviv=-27.0/20.0/66.8, Thessaloniki=-36.4/16.0/64.6, Thiès=-22.4/24.0/74.2, Tijuana=-29.9/17.8/67.9, Timbuktu=-20.3/28.0/76.9, Tirana=-34.2/15.2/68.3, Toamasina=-25.2/23.4/78.7, Tokyo=-31.5/15.4/62.2, Toliara=-24.4/24.1/74.6, Toluca=-36.5/12.4/60.2, Toronto=-40.7/9.4/62.7, Tripoli=-32.3/20.0/67.9, Tromsø=-44.3/2.9/53.4, Tucson=-28.7/20.9/73.6, Tunis=-35.3/18.4/65.9, Ulaanbaatar=-55.5/-0.4/50.6, Upington=-29.9/20.4/76.8, Vaduz=-40.6/10.1/69.8, Valencia=-33.5/18.3/73.8, Valletta=-32.2/18.8/70.1, Vancouver=-38.7/10.4/64.5, Veracruz=-25.0/25.4/76.1, Vienna=-39.5/10.4/63.9, Vientiane=-23.6/25.9/78.1, Villahermosa=-23.7/27.1/75.1, Vilnius=-43.7/6.0/56.9, Virginia Beach=-31.6/15.8/66.6, Vladivostok=-46.6/4.9/55.3, Warsaw=-44.5/8.5/55.2, Washington, D.C.=-34.4/14.6/63.7, Wau=-22.0/27.8/79.3, Wellington=-36.5/12.9/61.2, Whitehorse=-49.8/-0.1/48.7, Wichita=-36.1/13.9/64.1, Willemstad=-25.4/28.0/79.2, Winnipeg=-48.1/3.0/56.5, Wrocław=-39.2/9.6/59.3, Xi'an=-38.3/14.1/64.6, Yakutsk=-57.8/-8.8/40.8, Yangon=-23.1/27.5/83.6, Yaoundé=-35.7/23.8/72.9, Yellowknife=-52.0/-4.3/42.5, Yerevan=-42.5/12.4/63.4, Yinchuan=-40.9/9.0/57.6, Zagreb=-37.9/10.7/58.1, Zanzibar City=-23.9/26.0/77.2, Zürich=-39.0/9.3/56.0, Ürümqi=-39.6/7.4/58.1, İzmir=-32.8/17.9/67.9}Run Time (s): real 5.327 user 44.402699 sys 4.063590

.quit
real 33.54
user 253.39
sys 10.08
```

This gives us the following timings:

* 33.54 seconds elapsed, of which:

  * 27.48s reading the file
  * 5.33s calculations

## Optimisations [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#optimisations)

If we nest the `READ_CSV` directly in the CTE (instead of doing a `CREATE TABLE` with it beforehand) then we shave off some time, taking it down to about 26 seconds:

```bash
❯ /usr/bin/time -p duckdb -no-stdin -init 1brc.opt2.sql
-- Loading resources from 1brc.opt2.sql

WITH src AS (SELECT station_name,
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';')
            GROUP BY station_name)
    SELECT '{' ||
            ARRAY_TO_STRING(LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement))),', ') ||
            '}' AS "1BRC"
    FROM src;
100% ▕████████████████████████████████████████████████████████████▏
1BRC{Abha=-33.0/18.0/69.2, Abidjan=-24.4/26.0/75.4, Abéché=-21.1/29.4/77.1, Accra=-25.1/26.4/79.0, Addis Ababa=-33.6/16.0/66.8, Adelaide=-33.4/17.3/68.5, Aden=-19.3/29.1/77.9, Ahvaz=-24.1/25.4/74.0, Albuquerque=-33.5/14.0/61.8, Alexandra=-39.7/11.0/63.7, Alexandria=-30.2/20.0/74.4, Algiers=-39.2/18.2/68.1, Alice Springs=-32.5/21.0/67.6, Almaty=-37.4/10.0/59.0, Amsterdam=-39.8/10.2/60.6, Anadyr=-59.6/-6.9/42.6, Anchorage=-45.3/2.8/53.4, Andorra la Vella=-41.5/9.8/59.4, Ankara=-41.1/12.0/60.7, Antananarivo=-31.3/17.9/69.2, Antsiranana=-26.0/25.2/74.4, Arkhangelsk=-45.8/1.3/58.6, Ashgabat=-34.8/17.1/68.5, Asmara=-32.4/15.6/65.1, Assab=-23.4/30.5/81.7, Astana=-46.4/3.5/52.5, Athens=-31.6/19.2/68.3, Atlanta=-33.1/17.0/65.3, Auckland=-33.6/15.2/62.4, Austin=-27.3/20.7/67.3, Baghdad=-29.0/22.8/73.4, Baguio=-29.6/19.5/69.2, Baku=-31.6/15.1/63.3, Baltimore=-37.3/13.1/61.8, Bamako=-22.4/27.8/78.7, Bangkok=-25.7/28.6/78.4, Bangui=-23.0/26.0/75.6, Banjul=-25.6/26.0/71.7, Barcelona=-31.3/18.2/65.3, Bata=-22.5/25.1/80.4, Batumi=-33.3/14.0/63.0, Beijing=-34.5/12.9/63.9, Beirut=-28.6/20.9/70.9, Belgrade=-36.0/12.5/60.5, Belize City=-26.4/26.7/75.2, Benghazi=-33.9/19.9/72.9, Bergen=-42.5/7.7/54.3, Berlin=-37.6/10.3/61.3, Bilbao=-36.5/14.7/65.9, Birao=-25.7/26.5/76.0, Bishkek=-38.9/11.3/59.6, Bissau=-21.0/27.0/75.0, Blantyre=-26.3/22.2/72.8, Bloemfontein=-34.3/15.6/65.8, Boise=-37.2/11.4/59.2, Bordeaux=-35.1/14.2/64.4, Bosaso=-21.1/30.0/82.5, Boston=-42.1/10.9/61.9, Bouaké=-24.0/26.0/75.9, Bratislava=-38.7/10.5/62.3, Brazzaville=-26.6/25.0/71.4, Bridgetown=-22.3/27.0/79.8, Brisbane=-30.4/21.4/71.4, Brussels=-39.1/10.5/60.7, Bucharest=-39.9/10.8/60.0, Budapest=-37.8/11.3/63.8, Bujumbura=-25.6/23.8/86.6, Bulawayo=-29.9/18.9/71.8, Burnie=-36.1/13.1/63.2, Busan=-36.8/15.0/64.3, Cabo San Lucas=-26.0/23.9/70.9, Cairns=-23.1/25.0/74.6, Cairo=-27.2/21.4/71.1, Calgary=-43.0/4.4/54.6, Canberra=-34.8/13.1/66.4, Cape Town=-33.0/16.2/64.1, Changsha=-34.1/17.4/68.0, Charlotte=-37.2/16.1/66.0, Chiang Mai=-22.3/25.8/72.7, Chicago=-37.6/9.8/63.3, Chihuahua=-29.6/18.6/72.5, Chittagong=-23.0/25.9/75.1, Chișinău=-35.3/10.2/58.3, Chongqing=-35.9/18.6/70.6, Christchurch=-40.6/12.2/63.0, City of San Marino=-44.6/11.8/61.8, Colombo=-21.7/27.4/74.9, Columbus=-34.7/11.7/61.1, Conakry=-25.6/26.4/75.7, Copenhagen=-40.2/9.1/58.4, Cotonou=-22.8/27.2/78.5, Cracow=-42.1/9.3/62.6, Da Lat=-31.1/17.9/65.7, Da Nang=-23.9/25.8/73.5, Dakar=-25.3/24.0/77.6, Dallas=-33.4/19.0/69.6, Damascus=-32.4/17.0/66.5, Dampier=-23.7/26.4/76.5, Dar es Salaam=-32.1/25.8/72.0, Darwin=-25.5/27.6/80.6, Denpasar=-26.2/23.7/71.8, Denver=-41.5/10.4/59.5, Detroit=-38.6/10.0/62.4, Dhaka=-22.8/25.9/76.4, Dikson=-62.7/-11.1/39.0, Dili=-26.0/26.6/78.4, Djibouti=-19.2/29.9/79.6, Dodoma=-31.6/22.7/71.4, Dolisie=-28.8/24.0/75.4, Douala=-21.4/26.7/79.6, Dubai=-22.8/26.9/75.0, Dublin=-44.0/9.8/59.5, Dunedin=-42.7/11.1/64.8, Durban=-29.8/20.6/67.6, Dushanbe=-36.0/14.7/64.1, Edinburgh=-38.0/9.3/60.4, Edmonton=-45.1/4.2/57.7, El Paso=-34.0/18.1/65.6, Entebbe=-28.2/21.0/68.8, Erbil=-28.7/19.5/68.4, Erzurum=-59.1/5.1/52.7, Fairbanks=-53.7/-2.3/49.5, Fianarantsoa=-29.2/17.9/68.1, Flores,  Petén=-26.1/26.4/76.1, Frankfurt=-36.8/10.6/59.0, Fresno=-35.2/17.9/66.9, Fukuoka=-30.4/17.0/66.5, Gaborone=-26.4/21.0/71.1, Gabès=-31.9/19.5/72.1, Gagnoa=-21.3/26.0/75.6, Gangtok=-32.2/15.2/64.0, Garissa=-20.1/29.3/79.5, Garoua=-22.2/28.3/81.5, George Town=-20.6/27.9/76.6, Ghanzi=-28.2/21.4/70.9, Gjoa Haven=-65.2/-14.4/35.7, Guadalajara=-28.3/20.9/79.5, Guangzhou=-33.5/22.4/73.1, Guatemala City=-31.2/20.4/71.3, Halifax=-47.6/7.5/53.9, Hamburg=-42.7/9.7/60.2, Hamilton=-36.6/13.8/63.5, Hanga Roa=-27.6/20.5/69.3, Hanoi=-24.9/23.6/74.1, Harare=-33.0/18.4/69.0, Harbin=-45.9/5.0/55.5, Hargeisa=-30.0/21.7/72.5, Hat Yai=-25.0/27.0/79.0, Havana=-24.8/25.2/75.7, Helsinki=-43.1/5.9/56.2, Heraklion=-32.4/18.9/69.0, Hiroshima=-33.9/16.3/70.1, Ho Chi Minh City=-24.0/27.4/84.4, Hobart=-38.7/12.7/63.5, Hong Kong=-26.6/23.3/72.2, Honiara=-25.5/26.5/75.4, Honolulu=-25.8/25.4/73.5, Houston=-28.6/20.8/69.1, Ifrane=-36.7/11.4/61.5, Indianapolis=-37.9/11.8/63.6, Iqaluit=-57.0/-9.3/41.7, Irkutsk=-48.5/1.0/48.6, Istanbul=-33.4/13.9/60.6, Jacksonville=-28.2/20.3/69.9, Jakarta=-21.9/26.7/76.4, Jayapura=-25.0/27.0/75.5, Jerusalem=-31.2/18.3/67.6, Johannesburg=-35.3/15.5/66.9, Jos=-28.9/22.8/71.8, Juba=-20.9/27.8/79.4, Kabul=-36.1/12.1/61.8, Kampala=-28.1/20.0/69.1, Kandi=-22.0/27.7/76.9, Kankan=-24.0/26.5/74.6, Kano=-21.3/26.4/79.3, Kansas City=-40.6/12.5/62.8, Karachi=-25.3/26.0/81.8, Karonga=-22.9/24.4/72.4, Kathmandu=-32.2/18.3/66.6, Khartoum=-23.2/29.9/80.7, Kingston=-20.5/27.4/82.6, Kinshasa=-25.0/25.3/74.0, Kolkata=-24.9/26.7/73.9, Kuala Lumpur=-25.9/27.3/76.2, Kumasi=-23.1/26.0/74.6, Kunming=-36.1/15.7/67.9, Kuopio=-47.0/3.4/56.9, Kuwait City=-25.8/25.7/74.1, Kyiv=-40.6/8.4/62.5, Kyoto=-36.9/15.8/62.4, La Ceiba=-22.1/26.2/76.5, La Paz=-27.7/23.7/71.5, Lagos=-23.9/26.8/76.1, Lahore=-28.4/24.3/77.3, Lake Havasu City=-28.0/23.7/77.1, Lake Tekapo=-37.7/8.7/62.3, Las Palmas de Gran Canaria=-29.0/21.2/69.9, Las Vegas=-28.4/20.3/72.0, Launceston=-36.5/13.1/62.6, Lhasa=-44.2/7.6/59.7, Libreville=-22.8/25.9/75.4, Lisbon=-29.6/17.5/65.5, Livingstone=-29.2/21.8/70.9, Ljubljana=-39.0/10.9/59.3, Lodwar=-24.5/29.3/75.7, Lomé=-20.2/26.9/75.8, London=-36.4/11.3/61.3, Los Angeles=-29.4/18.6/67.7, Louisville=-36.7/13.9/64.1, Luanda=-23.9/25.8/73.5, Lubumbashi=-28.5/20.8/70.1, Lusaka=-26.5/19.9/71.8, Luxembourg City=-39.0/9.3/60.7, Lviv=-42.8/7.8/56.1, Lyon=-39.8/12.5/63.9, Madrid=-35.0/15.0/66.5, Mahajanga=-23.6/26.3/78.7, Makassar=-23.5/26.7/77.7, Makurdi=-21.5/26.0/76.8, Malabo=-21.6/26.3/75.2, Malé=-23.3/28.0/76.1, Managua=-20.8/27.3/75.9, Manama=-24.0/26.5/74.2, Mandalay=-23.5/28.0/76.8, Mango=-20.7/28.1/76.8, Manila=-20.7/28.4/75.6, Maputo=-29.1/22.8/78.7, Marrakesh=-29.3/19.6/70.9, Marseille=-31.0/15.8/66.9, Maun=-28.9/22.4/69.7, Medan=-24.2/26.5/76.0, Mek'ele=-29.4/22.7/73.3, Melbourne=-38.3/15.1/66.1, Memphis=-33.5/17.2/67.1, Mexicali=-24.0/23.1/71.9, Mexico City=-32.0/17.5/71.3, Miami=-29.6/24.9/75.9, Milan=-33.2/13.0/60.8, Milwaukee=-40.1/8.9/59.1, Minneapolis=-41.5/7.8/56.3, Minsk=-42.8/6.7/54.2, Mogadishu=-21.8/27.1/76.8, Mombasa=-22.8/26.3/76.9, Monaco=-38.1/16.4/66.9, Moncton=-42.1/6.1/59.2, Monterrey=-27.4/22.3/70.4, Montreal=-41.6/6.8/57.2, Moscow=-46.6/5.8/56.8, Mumbai=-23.1/27.1/76.1, Murmansk=-52.9/0.6/51.2, Muscat=-20.6/28.0/74.0, Mzuzu=-31.0/17.7/66.6, N'Djamena=-21.9/28.3/75.6, Naha=-26.3/23.1/72.2, Nairobi=-32.5/17.8/69.6, Nakhon Ratchasima=-24.9/27.3/75.3, Napier=-35.8/14.6/64.5, Napoli=-38.7/15.9/64.9, Nashville=-34.2/15.4/67.1, Nassau=-24.2/24.6/71.8, Ndola=-29.9/20.3/70.9, New Delhi=-23.3/25.0/77.2, New Orleans=-29.8/20.7/72.1, New York City=-35.6/12.9/62.6, Ngaoundéré=-28.1/22.0/69.9, Niamey=-20.6/29.3/78.0, Nicosia=-29.4/19.7/68.2, Niigata=-36.7/13.9/69.4, Nouadhibou=-29.9/21.3/73.9, Nouakchott=-25.6/25.7/73.4, Novosibirsk=-47.8/1.7/50.6, Nuuk=-53.1/-1.4/49.1, Odesa=-39.9/10.7/60.5, Odienné=-23.3/26.0/76.2, Oklahoma City=-34.6/15.9/66.9, Omaha=-38.2/10.6/65.6, Oranjestad=-22.1/28.1/81.0, Oslo=-44.5/5.7/54.8, Ottawa=-44.5/6.6/57.8, Ouagadougou=-25.9/28.3/81.2, Ouahigouya=-20.0/28.6/77.4, Ouarzazate=-30.3/18.9/73.1, Oulu=-45.4/2.7/54.9, Palembang=-24.7/27.3/75.9, Palermo=-30.1/18.5/71.7, Palm Springs=-26.4/24.5/78.2, Palmerston North=-37.3/13.2/64.8, Panama City=-22.3/28.0/75.6, Parakou=-23.9/26.8/76.2, Paris=-38.3/12.3/62.7, Perth=-30.1/18.7/72.0, Petropavlovsk-Kamchatsky=-47.2/1.9/49.2, Philadelphia=-37.3/13.2/64.6, Phnom Penh=-18.4/28.3/79.7, Phoenix=-25.5/23.9/73.4, Pittsburgh=-35.0/10.8/60.8, Podgorica=-34.0/15.3/70.7, Pointe-Noire=-25.7/26.1/76.1, Pontianak=-24.3/27.7/76.5, Port Moresby=-21.6/26.9/77.9, Port Sudan=-20.4/28.4/78.1, Port Vila=-26.1/24.3/74.7, Port-Gentil=-23.9/26.0/76.0, Portland (OR)=-35.6/12.4/59.7, Porto=-35.5/15.7/63.8, Prague=-42.2/8.4/61.1, Praia=-26.0/24.4/75.6, Pretoria=-29.0/18.2/67.7, Pyongyang=-42.5/10.8/59.3, Rabat=-31.2/17.2/68.7, Rangpur=-21.9/24.4/74.3, Reggane=-20.3/28.3/79.2, Reykjavík=-49.4/4.3/53.5, Riga=-40.5/6.2/57.0, Riyadh=-23.1/26.0/74.0, Rome=-31.8/15.2/68.6, Roseau=-22.8/26.2/76.1, Rostov-on-Don=-41.8/9.9/57.2, Sacramento=-39.3/16.3/67.2, Saint Petersburg=-42.6/5.8/56.4, Saint-Pierre=-43.4/5.7/56.2, Salt Lake City=-35.3/11.6/61.8, San Antonio=-29.8/20.8/71.2, San Diego=-31.1/17.8/66.1, San Francisco=-35.3/14.6/60.4, San Jose=-33.0/16.4/65.1, San José=-26.4/22.6/69.7, San Juan=-20.5/27.2/77.3, San Salvador=-25.7/23.1/75.1, Sana'a=-30.8/20.0/68.6, Santo Domingo=-23.6/25.9/76.6, Sapporo=-38.9/8.9/61.8, Sarajevo=-45.0/10.1/59.4, Saskatoon=-47.3/3.3/51.5, Seattle=-38.1/11.3/60.6, Seoul=-36.0/12.5/61.2, Seville=-32.2/19.2/73.1, Shanghai=-35.1/16.7/67.0, Singapore=-23.7/27.0/81.9, Skopje=-35.5/12.4/64.3, Sochi=-34.3/14.2/65.2, Sofia=-38.2/10.6/61.6, Sokoto=-23.1/28.0/73.2, Split=-32.7/16.1/62.2, St. John's=-44.1/5.0/56.4, St. Louis=-41.2/13.9/64.2, Stockholm=-45.5/6.6/55.9, Surabaya=-23.4/27.1/76.1, Suva=-28.1/25.6/78.8, Suwałki=-45.4/7.2/62.3, Sydney=-30.1/17.7/68.8, Ségou=-23.2/28.0/75.1, Tabora=-24.7/23.0/73.7, Tabriz=-36.8/12.6/61.9, Taipei=-24.6/23.0/74.8, Tallinn=-42.6/6.4/60.7, Tamale=-23.3/27.9/77.7, Tamanrasset=-28.7/21.7/71.7, Tampa=-34.8/22.9/70.4, Tashkent=-32.2/14.8/64.3, Tauranga=-38.9/14.8/66.9, Tbilisi=-34.6/12.9/66.2, Tegucigalpa=-27.1/21.7/74.1, Tehran=-33.5/17.0/73.6, Tel Aviv=-27.0/20.0/66.8, Thessaloniki=-36.4/16.0/64.6, Thiès=-22.4/24.0/74.2, Tijuana=-29.9/17.8/67.9, Timbuktu=-20.3/28.0/76.9, Tirana=-34.2/15.2/68.3, Toamasina=-25.2/23.4/78.7, Tokyo=-31.5/15.4/62.2, Toliara=-24.4/24.1/74.6, Toluca=-36.5/12.4/60.2, Toronto=-40.7/9.4/62.7, Tripoli=-32.3/20.0/67.9, Tromsø=-44.3/2.9/53.4, Tucson=-28.7/20.9/73.6, Tunis=-35.3/18.4/65.9, Ulaanbaatar=-55.5/-0.4/50.6, Upington=-29.9/20.4/76.8, Vaduz=-40.6/10.1/69.8, Valencia=-33.5/18.3/73.8, Valletta=-32.2/18.8/70.1, Vancouver=-38.7/10.4/64.5, Veracruz=-25.0/25.4/76.1, Vienna=-39.5/10.4/63.9, Vientiane=-23.6/25.9/78.1, Villahermosa=-23.7/27.1/75.1, Vilnius=-43.7/6.0/56.9, Virginia Beach=-31.6/15.8/66.6, Vladivostok=-46.6/4.9/55.3, Warsaw=-44.5/8.5/55.2, Washington, D.C.=-34.4/14.6/63.7, Wau=-22.0/27.8/79.3, Wellington=-36.5/12.9/61.2, Whitehorse=-49.8/-0.1/48.7, Wichita=-36.1/13.9/64.1, Willemstad=-25.4/28.0/79.2, Winnipeg=-48.1/3.0/56.5, Wrocław=-39.2/9.6/59.3, Xi'an=-38.3/14.1/64.6, Yakutsk=-57.8/-8.8/40.8, Yangon=-23.1/27.5/83.6, Yaoundé=-35.7/23.8/72.9, Yellowknife=-52.0/-4.3/42.5, Yerevan=-42.5/12.4/63.4, Yinchuan=-40.9/9.0/57.6, Zagreb=-37.9/10.7/58.1, Zanzibar City=-23.9/26.0/77.2, Zürich=-39.0/9.3/56.0, Ürümqi=-39.6/7.4/58.1, İzmir=-32.8/17.9/67.9}Run Time (s): real 25.539 user 203.968621 sys 2.572107

.quit
real 25.58
user 203.98
sys 2.57
```

## Bonus bit - let’s just stick to SQL [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#bonus-bit---lets-just-stick-to-sql)

If we extend the liberty that we’ve taken here in daring to use SQL for a Java-only challenge 😜 then how about we ignore the specified output, and just output the aggregation result directly:

```bash
❯ /usr/bin/time -p duckdb -no-stdin -init 1brc.opt.sql
-- Loading resources from 1brc.opt.sql

SELECT station_name,
        MIN(measurement) AS min_measurement,
        CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
        MAX(measurement) AS max_measurement
FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';')
GROUP BY station_name
ORDER BY station_name;
100% ▕████████████████████████████████████████████████████████████▏
┌────────────────────────────┬─────────────────┬──────────────────┬─────────────────┐
│        station_name        │ min_measurement │ mean_measurement │ max_measurement │
│          varchar           │     double      │   decimal(8,1)   │     double      │
├────────────────────────────┼─────────────────┼──────────────────┼─────────────────┤
│ Abha                       │           -33.0 │             18.0 │            69.2 │
│ Abidjan                    │           -24.4 │             26.0 │            75.4 │
│ Abéché                     │           -21.1 │             29.4 │            77.1 │
│ Accra                      │           -25.1 │             26.4 │            79.0 │
│ Addis Ababa                │           -33.6 │             16.0 │            66.8 │
[…long list removed for this blog copy…]
│ Yinchuan                   │           -40.9 │              9.0 │            57.6 │
│ Zagreb                     │           -37.9 │             10.7 │            58.1 │
│ Zanzibar City              │           -23.9 │             26.0 │            77.2 │
│ Zürich                     │           -39.0 │              9.3 │            56.0 │
│ Ürümqi                     │           -39.6 │              7.4 │            58.1 │
│ İzmir                      │           -32.8 │             17.9 │            67.9 │
├────────────────────────────┴─────────────────┴──────────────────┴─────────────────┤
│ 413 rows                                                                4 columns │
└───────────────────────────────────────────────────────────────────────────────────┘
Run Time (s): real 25.867 user 203.974231 sys 2.650887

.quit
real 25.91
user 203.98
sys 2.65
```

Seems that the formatting doesn’t really change things.

## Extra bonus bit - using Parquet [🔗](https://rmoff.net/2024/01/03/1%EF%B8%8F%E2%83%A3%EF%B8%8F-1brc-in-sql-with-duckdb/#extra-bonus-bit---using-parquet)

Deviating even further from the challenge here—part of which is specifically to read a CSV file—let’s see what happens if the data were in Parquet format.

First we’ll convert the CSV to Parquet in a one-off step:

```bash
$ /usr/bin/time duckdb -c "COPY (SELECT * FROM READ_CSV('measurements.txt', header=false, columns= {'station_name':'VARCHAR','measurement':'double'}, delim=';')) TO 'measurements.parquet' (FORMAT PARQUET);"
100% ▕████████████████████████████████████████████████████████████▏
       38.50 real       297.22 user        13.84 sys

$ ls -lh measurements.parquet
-rw-r--r--@ 1 rmoff  staff   5.1G  3 Jan 18:01 measurements.parquet
```

Now, having done our cheat-step, we use the same query as above but reading the Parquet file instead of CSV:

```bash
❯ /usr/bin/time -p duckdb -no-stdin -init 1brc.parquet.sql
-- Loading resources from 1brc.parquet.sql

WITH src AS (SELECT station_name,
                    MIN(measurement) AS min_measurement,
                    CAST(AVG(measurement) AS DECIMAL(8,1)) AS mean_measurement,
                    MAX(measurement) AS max_measurement
            FROM READ_PARQUET('measurements.parquet')
            GROUP BY station_name)
    SELECT '{' ||
            ARRAY_TO_STRING(LIST_SORT(LIST(station_name || '=' || CONCAT_WS('/',min_measurement, mean_measurement, max_measurement))),', ') ||
            '}' AS "1BRC"
    FROM src;
100% ▕████████████████████████████████████████████████████████████▏
1BRC{Abha=-33.0/18.0/69.2, Abidjan=-24.4/26.0/75.4, Abéché=-21.1/29.4/77.1, Accra=-25.1/26.4/79.0, Addis Ababa=-33.6/16.0/66.8, Adelaide=-33.4/17.3/68.5, Aden=-19.3/29.1/77.9, Ahvaz=-24.1/25.4/74.0, Albuquerque=-33.5/14.0/61.8, Alexandra=-39.7/11.0/63.7, Alexandria=-30.2/20.0/74.4, Algiers=-39.2/18.2/68.1, Alice Springs=-32.5/21.0/67.6, Almaty=-37.4/10.0/59.0, Amsterdam=-39.8/10.2/60.6, Anadyr=-59.6/-6.9/42.6, Anchorage=-45.3/2.8/53.4, Andorra la Vella=-41.5/9.8/59.4, Ankara=-41.1/12.0/60.7, Antananarivo=-31.3/17.9/69.2, Antsiranana=-26.0/25.2/74.4, Arkhangelsk=-45.8/1.3/58.6, Ashgabat=-34.8/17.1/68.5, Asmara=-32.4/15.6/65.1, Assab=-23.4/30.5/81.7, Astana=-46.4/3.5/52.5, Athens=-31.6/19.2/68.3, Atlanta=-33.1/17.0/65.3, Auckland=-33.6/15.2/62.4, Austin=-27.3/20.7/67.3, Baghdad=-29.0/22.8/73.4, Baguio=-29.6/19.5/69.2, Baku=-31.6/15.1/63.3, Baltimore=-37.3/13.1/61.8, Bamako=-22.4/27.8/78.7, Bangkok=-25.7/28.6/78.4, Bangui=-23.0/26.0/75.6, Banjul=-25.6/26.0/71.7, Barcelona=-31.3/18.2/65.3, Bata=-22.5/25.1/80.4, Batumi=-33.3/14.0/63.0, Beijing=-34.5/12.9/63.9, Beirut=-28.6/20.9/70.9, Belgrade=-36.0/12.5/60.5, Belize City=-26.4/26.7/75.2, Benghazi=-33.9/19.9/72.9, Bergen=-42.5/7.7/54.3, Berlin=-37.6/10.3/61.3, Bilbao=-36.5/14.7/65.9, Birao=-25.7/26.5/76.0, Bishkek=-38.9/11.3/59.6, Bissau=-21.0/27.0/75.0, Blantyre=-26.3/22.2/72.8, Bloemfontein=-34.3/15.6/65.8, Boise=-37.2/11.4/59.2, Bordeaux=-35.1/14.2/64.4, Bosaso=-21.1/30.0/82.5, Boston=-42.1/10.9/61.9, Bouaké=-24.0/26.0/75.9, Bratislava=-38.7/10.5/62.3, Brazzaville=-26.6/25.0/71.4, Bridgetown=-22.3/27.0/79.8, Brisbane=-30.4/21.4/71.4, Brussels=-39.1/10.5/60.7, Bucharest=-39.9/10.8/60.0, Budapest=-37.8/11.3/63.8, Bujumbura=-25.6/23.8/86.6, Bulawayo=-29.9/18.9/71.8, Burnie=-36.1/13.1/63.2, Busan=-36.8/15.0/64.3, Cabo San Lucas=-26.0/23.9/70.9, Cairns=-23.1/25.0/74.6, Cairo=-27.2/21.4/71.1, Calgary=-43.0/4.4/54.6, Canberra=-34.8/13.1/66.4, Cape Town=-33.0/16.2/64.1, Changsha=-34.1/17.4/68.0, Charlotte=-37.2/16.1/66.0, Chiang Mai=-22.3/25.8/72.7, Chicago=-37.6/9.8/63.3, Chihuahua=-29.6/18.6/72.5, Chittagong=-23.0/25.9/75.1, Chișinău=-35.3/10.2/58.3, Chongqing=-35.9/18.6/70.6, Christchurch=-40.6/12.2/63.0, City of San Marino=-44.6/11.8/61.8, Colombo=-21.7/27.4/74.9, Columbus=-34.7/11.7/61.1, Conakry=-25.6/26.4/75.7, Copenhagen=-40.2/9.1/58.4, Cotonou=-22.8/27.2/78.5, Cracow=-42.1/9.3/62.6, Da Lat=-31.1/17.9/65.7, Da Nang=-23.9/25.8/73.5, Dakar=-25.3/24.0/77.6, Dallas=-33.4/19.0/69.6, Damascus=-32.4/17.0/66.5, Dampier=-23.7/26.4/76.5, Dar es Salaam=-32.1/25.8/72.0, Darwin=-25.5/27.6/80.6, Denpasar=-26.2/23.7/71.8, Denver=-41.5/10.4/59.5, Detroit=-38.6/10.0/62.4, Dhaka=-22.8/25.9/76.4, Dikson=-62.7/-11.1/39.0, Dili=-26.0/26.6/78.4, Djibouti=-19.2/29.9/79.6, Dodoma=-31.6/22.7/71.4, Dolisie=-28.8/24.0/75.4, Douala=-21.4/26.7/79.6, Dubai=-22.8/26.9/75.0, Dublin=-44.0/9.8/59.5, Dunedin=-42.7/11.1/64.8, Durban=-29.8/20.6/67.6, Dushanbe=-36.0/14.7/64.1, Edinburgh=-38.0/9.3/60.4, Edmonton=-45.1/4.2/57.7, El Paso=-34.0/18.1/65.6, Entebbe=-28.2/21.0/68.8, Erbil=-28.7/19.5/68.4, Erzurum=-59.1/5.1/52.7, Fairbanks=-53.7/-2.3/49.5, Fianarantsoa=-29.2/17.9/68.1, Flores,  Petén=-26.1/26.4/76.1, Frankfurt=-36.8/10.6/59.0, Fresno=-35.2/17.9/66.9, Fukuoka=-30.4/17.0/66.5, Gaborone=-26.4/21.0/71.1, Gabès=-31.9/19.5/72.1, Gagnoa=-21.3/26.0/75.6, Gangtok=-32.2/15.2/64.0, Garissa=-20.1/29.3/79.5, Garoua=-22.2/28.3/81.5, George Town=-20.6/27.9/76.6, Ghanzi=-28.2/21.4/70.9, Gjoa Haven=-65.2/-14.4/35.7, Guadalajara=-28.3/20.9/79.5, Guangzhou=-33.5/22.4/73.1, Guatemala City=-31.2/20.4/71.3, Halifax=-47.6/7.5/53.9, Hamburg=-42.7/9.7/60.2, Hamilton=-36.6/13.8/63.5, Hanga Roa=-27.6/20.5/69.3, Hanoi=-24.9/23.6/74.1, Harare=-33.0/18.4/69.0, Harbin=-45.9/5.0/55.5, Hargeisa=-30.0/21.7/72.5, Hat Yai=-25.0/27.0/79.0, Havana=-24.8/25.2/75.7, Helsinki=-43.1/5.9/56.2, Heraklion=-32.4/18.9/69.0, Hiroshima=-33.9/16.3/70.1, Ho Chi Minh City=-24.0/27.4/84.4, Hobart=-38.7/12.7/63.5, Hong Kong=-26.6/23.3/72.2, Honiara=-25.5/26.5/75.4, Honolulu=-25.8/25.4/73.5, Houston=-28.6/20.8/69.1, Ifrane=-36.7/11.4/61.5, Indianapolis=-37.9/11.8/63.6, Iqaluit=-57.0/-9.3/41.7, Irkutsk=-48.5/1.0/48.6, Istanbul=-33.4/13.9/60.6, Jacksonville=-28.2/20.3/69.9, Jakarta=-21.9/26.7/76.4, Jayapura=-25.0/27.0/75.5, Jerusalem=-31.2/18.3/67.6, Johannesburg=-35.3/15.5/66.9, Jos=-28.9/22.8/71.8, Juba=-20.9/27.8/79.4, Kabul=-36.1/12.1/61.8, Kampala=-28.1/20.0/69.1, Kandi=-22.0/27.7/76.9, Kankan=-24.0/26.5/74.6, Kano=-21.3/26.4/79.3, Kansas City=-40.6/12.5/62.8, Karachi=-25.3/26.0/81.8, Karonga=-22.9/24.4/72.4, Kathmandu=-32.2/18.3/66.6, Khartoum=-23.2/29.9/80.7, Kingston=-20.5/27.4/82.6, Kinshasa=-25.0/25.3/74.0, Kolkata=-24.9/26.7/73.9, Kuala Lumpur=-25.9/27.3/76.2, Kumasi=-23.1/26.0/74.6, Kunming=-36.1/15.7/67.9, Kuopio=-47.0/3.4/56.9, Kuwait City=-25.8/25.7/74.1, Kyiv=-40.6/8.4/62.5, Kyoto=-36.9/15.8/62.4, La Ceiba=-22.1/26.2/76.5, La Paz=-27.7/23.7/71.5, Lagos=-23.9/26.8/76.1, Lahore=-28.4/24.3/77.3, Lake Havasu City=-28.0/23.7/77.1, Lake Tekapo=-37.7/8.7/62.3, Las Palmas de Gran Canaria=-29.0/21.2/69.9, Las Vegas=-28.4/20.3/72.0, Launceston=-36.5/13.1/62.6, Lhasa=-44.2/7.6/59.7, Libreville=-22.8/25.9/75.4, Lisbon=-29.6/17.5/65.5, Livingstone=-29.2/21.8/70.9, Ljubljana=-39.0/10.9/59.3, Lodwar=-24.5/29.3/75.7, Lomé=-20.2/26.9/75.8, London=-36.4/11.3/61.3, Los Angeles=-29.4/18.6/67.7, Louisville=-36.7/13.9/64.1, Luanda=-23.9/25.8/73.5, Lubumbashi=-28.5/20.8/70.1, Lusaka=-26.5/19.9/71.8, Luxembourg City=-39.0/9.3/60.7, Lviv=-42.8/7.8/56.1, Lyon=-39.8/12.5/63.9, Madrid=-35.0/15.0/66.5, Mahajanga=-23.6/26.3/78.7, Makassar=-23.5/26.7/77.7, Makurdi=-21.5/26.0/76.8, Malabo=-21.6/26.3/75.2, Malé=-23.3/28.0/76.1, Managua=-20.8/27.3/75.9, Manama=-24.0/26.5/74.2, Mandalay=-23.5/28.0/76.8, Mango=-20.7/28.1/76.8, Manila=-20.7/28.4/75.6, Maputo=-29.1/22.8/78.7, Marrakesh=-29.3/19.6/70.9, Marseille=-31.0/15.8/66.9, Maun=-28.9/22.4/69.7, Medan=-24.2/26.5/76.0, Mek'ele=-29.4/22.7/73.3, Melbourne=-38.3/15.1/66.1, Memphis=-33.5/17.2/67.1, Mexicali=-24.0/23.1/71.9, Mexico City=-32.0/17.5/71.3, Miami=-29.6/24.9/75.9, Milan=-33.2/13.0/60.8, Milwaukee=-40.1/8.9/59.1, Minneapolis=-41.5/7.8/56.3, Minsk=-42.8/6.7/54.2, Mogadishu=-21.8/27.1/76.8, Mombasa=-22.8/26.3/76.9, Monaco=-38.1/16.4/66.9, Moncton=-42.1/6.1/59.2, Monterrey=-27.4/22.3/70.4, Montreal=-41.6/6.8/57.2, Moscow=-46.6/5.8/56.8, Mumbai=-23.1/27.1/76.1, Murmansk=-52.9/0.6/51.2, Muscat=-20.6/28.0/74.0, Mzuzu=-31.0/17.7/66.6, N'Djamena=-21.9/28.3/75.6, Naha=-26.3/23.1/72.2, Nairobi=-32.5/17.8/69.6, Nakhon Ratchasima=-24.9/27.3/75.3, Napier=-35.8/14.6/64.5, Napoli=-38.7/15.9/64.9, Nashville=-34.2/15.4/67.1, Nassau=-24.2/24.6/71.8, Ndola=-29.9/20.3/70.9, New Delhi=-23.3/25.0/77.2, New Orleans=-29.8/20.7/72.1, New York City=-35.6/12.9/62.6, Ngaoundéré=-28.1/22.0/69.9, Niamey=-20.6/29.3/78.0, Nicosia=-29.4/19.7/68.2, Niigata=-36.7/13.9/69.4, Nouadhibou=-29.9/21.3/73.9, Nouakchott=-25.6/25.7/73.4, Novosibirsk=-47.8/1.7/50.6, Nuuk=-53.1/-1.4/49.1, Odesa=-39.9/10.7/60.5, Odienné=-23.3/26.0/76.2, Oklahoma City=-34.6/15.9/66.9, Omaha=-38.2/10.6/65.6, Oranjestad=-22.1/28.1/81.0, Oslo=-44.5/5.7/54.8, Ottawa=-44.5/6.6/57.8, Ouagadougou=-25.9/28.3/81.2, Ouahigouya=-20.0/28.6/77.4, Ouarzazate=-30.3/18.9/73.1, Oulu=-45.4/2.7/54.9, Palembang=-24.7/27.3/75.9, Palermo=-30.1/18.5/71.7, Palm Springs=-26.4/24.5/78.2, Palmerston North=-37.3/13.2/64.8, Panama City=-22.3/28.0/75.6, Parakou=-23.9/26.8/76.2, Paris=-38.3/12.3/62.7, Perth=-30.1/18.7/72.0, Petropavlovsk-Kamchatsky=-47.2/1.9/49.2, Philadelphia=-37.3/13.2/64.6, Phnom Penh=-18.4/28.3/79.7, Phoenix=-25.5/23.9/73.4, Pittsburgh=-35.0/10.8/60.8, Podgorica=-34.0/15.3/70.7, Pointe-Noire=-25.7/26.1/76.1, Pontianak=-24.3/27.7/76.5, Port Moresby=-21.6/26.9/77.9, Port Sudan=-20.4/28.4/78.1, Port Vila=-26.1/24.3/74.7, Port-Gentil=-23.9/26.0/76.0, Portland (OR)=-35.6/12.4/59.7, Porto=-35.5/15.7/63.8, Prague=-42.2/8.4/61.1, Praia=-26.0/24.4/75.6, Pretoria=-29.0/18.2/67.7, Pyongyang=-42.5/10.8/59.3, Rabat=-31.2/17.2/68.7, Rangpur=-21.9/24.4/74.3, Reggane=-20.3/28.3/79.2, Reykjavík=-49.4/4.3/53.5, Riga=-40.5/6.2/57.0, Riyadh=-23.1/26.0/74.0, Rome=-31.8/15.2/68.6, Roseau=-22.8/26.2/76.1, Rostov-on-Don=-41.8/9.9/57.2, Sacramento=-39.3/16.3/67.2, Saint Petersburg=-42.6/5.8/56.4, Saint-Pierre=-43.4/5.7/56.2, Salt Lake City=-35.3/11.6/61.8, San Antonio=-29.8/20.8/71.2, San Diego=-31.1/17.8/66.1, San Francisco=-35.3/14.6/60.4, San Jose=-33.0/16.4/65.1, San José=-26.4/22.6/69.7, San Juan=-20.5/27.2/77.3, San Salvador=-25.7/23.1/75.1, Sana'a=-30.8/20.0/68.6, Santo Domingo=-23.6/25.9/76.6, Sapporo=-38.9/8.9/61.8, Sarajevo=-45.0/10.1/59.4, Saskatoon=-47.3/3.3/51.5, Seattle=-38.1/11.3/60.6, Seoul=-36.0/12.5/61.2, Seville=-32.2/19.2/73.1, Shanghai=-35.1/16.7/67.0, Singapore=-23.7/27.0/81.9, Skopje=-35.5/12.4/64.3, Sochi=-34.3/14.2/65.2, Sofia=-38.2/10.6/61.6, Sokoto=-23.1/28.0/73.2, Split=-32.7/16.1/62.2, St. John's=-44.1/5.0/56.4, St. Louis=-41.2/13.9/64.2, Stockholm=-45.5/6.6/55.9, Surabaya=-23.4/27.1/76.1, Suva=-28.1/25.6/78.8, Suwałki=-45.4/7.2/62.3, Sydney=-30.1/17.7/68.8, Ségou=-23.2/28.0/75.1, Tabora=-24.7/23.0/73.7, Tabriz=-36.8/12.6/61.9, Taipei=-24.6/23.0/74.8, Tallinn=-42.6/6.4/60.7, Tamale=-23.3/27.9/77.7, Tamanrasset=-28.7/21.7/71.7, Tampa=-34.8/22.9/70.4, Tashkent=-32.2/14.8/64.3, Tauranga=-38.9/14.8/66.9, Tbilisi=-34.6/12.9/66.2, Tegucigalpa=-27.1/21.7/74.1, Tehran=-33.5/17.0/73.6, Tel Aviv=-27.0/20.0/66.8, Thessaloniki=-36.4/16.0/64.6, Thiès=-22.4/24.0/74.2, Tijuana=-29.9/17.8/67.9, Timbuktu=-20.3/28.0/76.9, Tirana=-34.2/15.2/68.3, Toamasina=-25.2/23.4/78.7, Tokyo=-31.5/15.4/62.2, Toliara=-24.4/24.1/74.6, Toluca=-36.5/12.4/60.2, Toronto=-40.7/9.4/62.7, Tripoli=-32.3/20.0/67.9, Tromsø=-44.3/2.9/53.4, Tucson=-28.7/20.9/73.6, Tunis=-35.3/18.4/65.9, Ulaanbaatar=-55.5/-0.4/50.6, Upington=-29.9/20.4/76.8, Vaduz=-40.6/10.1/69.8, Valencia=-33.5/18.3/73.8, Valletta=-32.2/18.8/70.1, Vancouver=-38.7/10.4/64.5, Veracruz=-25.0/25.4/76.1, Vienna=-39.5/10.4/63.9, Vientiane=-23.6/25.9/78.1, Villahermosa=-23.7/27.1/75.1, Vilnius=-43.7/6.0/56.9, Virginia Beach=-31.6/15.8/66.6, Vladivostok=-46.6/4.9/55.3, Warsaw=-44.5/8.5/55.2, Washington, D.C.=-34.4/14.6/63.7, Wau=-22.0/27.8/79.3, Wellington=-36.5/12.9/61.2, Whitehorse=-49.8/-0.1/48.7, Wichita=-36.1/13.9/64.1, Willemstad=-25.4/28.0/79.2, Winnipeg=-48.1/3.0/56.5, Wrocław=-39.2/9.6/59.3, Xi'an=-38.3/14.1/64.6, Yakutsk=-57.8/-8.8/40.8, Yangon=-23.1/27.5/83.6, Yaoundé=-35.7/23.8/72.9, Yellowknife=-52.0/-4.3/42.5, Yerevan=-42.5/12.4/63.4, Yinchuan=-40.9/9.0/57.6, Zagreb=-37.9/10.7/58.1, Zanzibar City=-23.9/26.0/77.2, Zürich=-39.0/9.3/56.0, Ürümqi=-39.6/7.4/58.1, İzmir=-32.8/17.9/67.9}Run Time (s): real 7.099 user 60.866615 sys 1.753477

.quit
real 7.11
user 60.87
sys 1.75
```

(https://www.youtube.com/c/rmoff)