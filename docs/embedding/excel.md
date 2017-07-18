## Onedrive Embed

The quick and easy method but less flexible is to do the following

1. In a browser go to your https://onedrive.live.com and right click on the Excel file and then select embed.

> :memo: :point_right: You can then just copy the iframe code in the text box
and paste it in to your document if desired but will loose the features you get below.

2. Click 'generate' button.
3. At bottom of panel click `Customize how this embedded workbook`.
4. In new window click the `javascript` tab above the textbox at bottom.
5. copy & paste all of it temporarily as the textbox is stupidly small
6. about 12 lines down locate the `var fileToken = ....` and copy the long code inside the quotes but don't copy the quotes themselves
5. paste it into a divs `data-excel-token` attribute as seen in the html example below

**simple example**
```html
<div
data-excel-token="SDF4E541E7F8747E1B!395/-800160894226760165/t=0&s=0&v=!ANZtfYbhiHy1ASg">
</div>
```

Will produce ...

<div
data-excel-token="SDF4E541E7F8747E1B!395/-800160894226760165/t=0&s=0&v=!ACxW3W7JLW28c3M" >
</div>

## Options

example setting default zoom
```html
<div data-excel-token="SDF4E541E7F8747E1B!395/-800160894226760165/t=0&s=0&v=!ACxW3W7JLW28c3M"
data-zoom="80">
</div>
```
