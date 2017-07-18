## Embed Jing swf

1. after recording your cast share via screen cast as you normally would do.
2. It puts the link on your clipboard. Go to a browser window and open that link
3. click `share` in the upper toolbar and copy the embed code. its helpful to also copy the `share url`
4. paste it into your md doc and adjust the width and height appropriately.
5. its helpful to also copy the `share url` from your clipboard stack below it.

```html
<object id="scPlayer"  width="100%" height="600" type="application/x-shockwave-flash" data="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/jingswfplayer.swf" >
 <param name="movie" value="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/jingswfplayer.swf" />
 <param name="quality" value="high" />
 <param name="bgcolor" value="#FFFFFF" />
 <param name="flashVars" value="thumb=https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/FirstFrame.jpg&containerwidth=942&containerheight=710&content=https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/00000005.swf&blurover=false" />
 <param name="allowFullScreen" value="true" />
 <param name="scale" value="showall" />
 <param name="allowScriptAccess" value="always" />
 <param name="base" value="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/" />
 Unable to display content. Adobe Flash is required.
</object>
```

http://www.screencast.com/t/3kAm4jBMGFUd
<!-- copy and paste. Modify height and width if desired. -->
 <object id="scPlayer"  width="100%" height="600" type="application/x-shockwave-flash" data="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/jingswfplayer.swf" >
 <param name="movie" value="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/jingswfplayer.swf" />
 <param name="quality" value="high" />
 <param name="bgcolor" value="#FFFFFF" />
 <param name="flashVars" value="thumb=https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/FirstFrame.jpg&containerwidth=942&containerheight=710&content=https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/00000005.swf&blurover=false" />
 <param name="allowFullScreen" value="true" />
 <param name="scale" value="showall" />
 <param name="allowScriptAccess" value="always" />
 <param name="base" value="https://content.screencast.com/users/Greenbill/folders/Public/media/d542c236-c23e-42d1-b097-afc728edc2bf/" />
 Unable to display content. Adobe Flash is required.
</object>

## Embed Snagit

Snagit allows you to upload to screencast as well but uses a more flexible mp4 format.
Instructions are the same but code to copy and paste in is much shorter.

```html
<iframe class="tscplayer_inline embeddedObject" name="tsc_player"
scrolling="no" frameborder="0" type="text/html" style="overflow:hidden;"
src="https://www.screencast.com/users/Greenbill/folders/Snagit/media/f02bf4ee-e4be-44d0-a06e-9a1cda01d005/embed"
height="400" width="1164"
webkitallowfullscreen mozallowfullscreen allowfullscreen>
</iframe>
```

<!-- copy and paste. Modify height and width if desired. -->
<iframe class="tscplayer_inline embeddedObject" name="tsc_player" scrolling="no" frameborder="0" type="text/html" style="overflow:hidden;" src="https://www.screencast.com/users/Greenbill/folders/Snagit/media/f02bf4ee-e4be-44d0-a06e-9a1cda01d005/embed" height="400" width="1164" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Snaggit is also much more flexible since it uses mp4 which is an html5 standard.
This is the same video and is check into this doc's github (its a small example).

```
<video width="320" height="240" controls>
<source src="../../images/example-snaggit.mp4?dl=0" type="video/mp4">
</video>
```

<video width="320" height="240" controls>
<source src="../../images/example-snaggit.mp4?dl=0" type="video/mp4">
</video>

if you save it to dropbox or onedrive you would reference it like this.

> :bulb: note how the `www.dropbox` part in the url is replaced with `dl.dropboxusercontent`

```
<video width="320" height="240" controls>
<source src="https://dl.dropboxusercontent.com/s/up7k0vasnd3r1pn/2017-07-16_12-07-55.mp4?dl=0" type="video/mp4">
</video>
```
