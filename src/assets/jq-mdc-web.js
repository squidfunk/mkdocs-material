var admonMapping = {
    ':memo:': 'card admonition',
    ':notebook:': 'card admonition',

    ':bulb:': 'card admonition tip',
    ':dart:': ' card admonition tip',

    ':warning:': 'card admonition warning',

    ':boom:': 'card admonition danger',
    ':fire:': 'card admonition danger',

    ':thumbsup:': 'card admonition success',
    ':ok:': 'card admonition success',

    ':bug:': 'card admonition bug',
    ':beetle:': 'card admonition bug',

    ':no_entry:': 'card admonition fail',
    ':x:': 'card admonition fail',

    ':book:': 'card admonition summary',

    ':pushpin:': 'card sidebar center',
    ':bookmark:': 'card sidebar center',

    ':mega:':'card callout flat center-content',

    ':card_index:':'card',

    ':camera:':'card figure flat',

    ':point_left:':'float-left',
    ':point_right:':'float-right'
}

//
$(function() {

  // var rex = new RegExp('^📝');
  // var mem = $("blockquote > p:first-child").filter(function () {
  //     return rex.test($.trim($(this).text()));
  // });
  // var mem = $("blockquote > p:first-child").filter(function() {
  //   return $.trim($(this).text()).indexOf('📝') === 0;
  // });
  // console.log("mem.length " + mem.length)
  //console.log("got one")
  var bqs = $('blockquote > p:first-child > img:first-child');
  console.log("bqs.length " + bqs.length)
  //bqs.add($allBars)

  bqs.each(function(index) {
    var bqImg = this
    var bqImgClasses = $(bqImg).attr('class')
    var bqImgId = $(bqImg).attr('id')
    // console.log(bqImg.title)
    if(!bqImg.title || !admonMapping[bqImg.title]) return;

    $bq = $(bqImg).parent('p').parent('blockquote')

    var admClass = admonMapping[bqImg.title]
    //if its just the point right or left slap the float and the blockquote and move on
    if(bqImg.title === ':point_right:' ||  bqImg.title === ':point_left:'){
      //copy any classes that might have been put on there
      $bq.addClass( bqImgClasses )
      $bq.attr('id', bqImgId)
      $(bqImg).remove()
      $bq.addClass(admClass)
      return
    }

    //check for float emojis
    var floatImg = $(this).next('img')
    //console.log(floatImg);
    if(floatImg.length > 0){
      if (floatImg[0].title === ':point_right:'){
        admClass = admClass + " float-right"
      } else if(floatImg[0].title === ':point_left:'){
        admClass = admClass + " float-left"
      }
    }

    var children = $bq.children().toArray();
    var panel = $('<div>')
      .addClass(admClass)
      .addClass(bqImgClasses)
      .attr('id', bqImgId)
      .append(children)

    floatImg.remove()
    $(bqImg).remove() //removes the initial image as the css will replace it

    //do the title
    var firstP = panel.find('p:first-child')
    var $title = firstP.find('strong:first-child')
    if($title.length){
      var title = $title[0]
      //remove empty text at beginning of paragraph
      if(title.nextSibling && $.trim(title.nextSibling.textContent) === "") $(title.nextSibling).remove()
      //get rid of <br> if its what now starts the pragraph
      if($(title.nextSibling).is('br')) $(title.nextSibling).remove()

      var admonTitle = "<p class='admonition-title'>" + title.innerHTML + "</p>"
      title.remove()
      //if its a figure put the title at the end
      if(panel.hasClass('figure')){
        //if the last child is a paragraph with just an image them move it out
        var pimg = panel.find('p:last-child > img')
        if(pimg.length = 1 && pimg.siblings().length == 0) panel.find('p:last-child').before(pimg)
        panel.find('> :last-child') //.css('margin-bottom','.5rem')
        //add the title
        panel.append(admonTitle)
      } else{
        panel.prepend(admonTitle)
      }
      //panel.prepend("<p class='admonition-title'>" + title.innerHTML + "</p>" )
      //title.remove() //get rid of the old one
      //if the paragraph is empty now after removing the title then remove it
      firstP.filter(function () { return $.trim(this.innerHTML) == "" }).remove();
      //console.log("******* panel is br*****" + panel)
      //console.log(panel)
    }

    //console.log(panel[0].innerHTML)
    //if last paragraph is empty then remove it
    panel.find('p').filter(function () { return $.trim(this.innerHTML) == "" }).remove();

    $bq.before(panel);
    $bq.remove();
    //$this.addClass( "admonition tip" );
  })

  // $('div.excel iframe').onload( function() {
  //   $('div.excel iframe').contents().find("head").append($("<style type='text/css'>  #m_excelEmbedRenderer_m_ewaEmbedViewerBar{display:none;}  </style>"));
  // });

  //show the content after its parsed
  //$("#article-content").show();
});

//add target blank to newTab links
$(function() {
  $('a.new-tab').attr('target', '_blank');
});

//setup fancybox zoomable
$(function() {
  $('img[alt="zoomify"]').each(function(index) {
    var imgSrc = this.src
    var $a = $('<a href="' + imgSrc + '" data-fancybox></a>')
    $a.fancybox()
    $(this).before($a)
    $a.append(this)
  })
});

/**
Excel Embed for Onedrive files
TODO move this out to its own js
*/
$(function() {
  //does the button stuff on the default select on the page
	$.excelEmbed = function(opts) { selectAll(opts); };
	$.excelEmbed.defaults = {
    showToolbar:true,
    uiOptions: {
      showDownloadButton: true,
      showGridlines: false,
      showParametersTaskPane: false,
      showRowColumnHeaders: false
      //selectedCell
    },
    interactivityOptions: {
      allowTypingAndFormulaEntry: true,
      allowParameterModification: true,
      allowSorting: false,
      allowFiltering: false,
      allowPivotTableInteractivity: false,
      allowHyperlinkNavigation: true
    }
	};

  $.getScript( "https://excel.officeapps.live.com/x/_layouts/ExcelJs.ashx?v=1",function() {
    selectAll();
  })

  function selectAll(o){
    console.log("embedding excel")
    $('div[data-excel-token]').each(function() {
      var divFrame = this;
      var $divFrame = $(this)
      var $iFrameDiv = $('<div></div>')
      var iFrameDiv = $iFrameDiv.get(0)
      $divFrame.append($iFrameDiv)
      //var $card = $divFrame.wrap(holder).parent()

      $divFrame.LoadingOverlay("show");
      //$it.hide();
      //console.log("data-excel-token", this.data-excel-token)
      var randId = "xls" + Math.floor(Math.random() * 100)
      $iFrameDiv.attr('id', randId)

      //setup the height and width stuff
      var dheight = divFrame.getAttribute('height')
      var dwidth = divFrame.getAttribute('width')
      if(dheight) {
        $divFrame.height(dheight + "px")
        $iFrameDiv.height(dheight + "px")
      }
      if(dwidth) {
        if(!dwidth.endsWith("%") && !dwidth.endsWith("px")){
          dwidth = dwidth + "px"
        }
        $divFrame.width(dwidth)
        $iFrameDiv.width(dwidth)
      }
      if($iFrameDiv.height() === 0){
        $iFrameDiv.addClass('excel-embed')
        //$iFrameDiv.height(600)
      }

      //add class for default height and width if not set
      // if(!$divFrame.hasClass('excel-embed')){
      //   $divFrame.addClass('excel-embed');
      // }

      var dataOpts = {}
      if($divFrame.data('range')) dataOpts.item = $divFrame.data('range')
      if($divFrame.data('interactivity')) dataOpts.interactivityOptions = $divFrame.data('interactivity')
      if($divFrame.data('ui')) dataOpts.uiOptions = $divFrame.data('ui')
      console.log("dataOpts", dataOpts);
      var opts = $.extend({}, $.excelEmbed.defaults, dataOpts);

      if($divFrame.data('selected-cell')) opts.uiOptions.selectedCell = $divFrame.data('selected-cell')
      if(divFrame.hasAttribute('data-show-toolbar')) opts.showToolbar = $divFrame.data('show-toolbar')
      console.log("opts", opts);

      var $toolbar = opts.showToolbar ? createToolbar(divFrame) : null

      var loadedCallback = function(result){
        var ewa = result.getEwaControl();
        var iframe = $iFrameDiv.find("iframe").get(0);
        //console.log("why wont it hide")
        if (result.getSucceeded()){
          console.log("getSucceeded")
          //remove the old toolbar
          var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          $(innerDoc).find("[id$='_m_ewaEmbedViewerBar']").hide()
          //configExcelToolbar(innerDoc)
          var docProps = getWorkbookContextJson($(innerDoc))
          if(divFrame.hasAttribute('data-zoom')){
            var zoom = parseInt(divFrame.getAttribute('data-zoom'))
            applyZoom(iFrameDiv,iframe,zoom)
          }
          console.log("applyZoom")
          toolbarEvents(iFrameDiv, $toolbar, docProps)
        }else{
          $divFrame.append('<strong>EXCEL EMBED FAILED</strong>')
        }
        //console.log("why wont it hide", $it)
        $divFrame.LoadingOverlay("hide");
      }

      Ewa.EwaControl.loadEwaAsync($(this).data('excel-token'), randId, opts, loadedCallback);
    });
  }

  function getWorkbookContextJson($innerDoc){
    //ewaSynd2_ctl17_ewaCtl_m_workbookContextJson
    var inputData = $innerDoc.find("input[id$='ctl17_ewaCtl_m_workbookContextJson']").get(0)
    var json = JSON.parse(inputData.value)
    console.log(json)
    return json;
  }

  function applyZoom(iFrameDiv,iframe,zoomTo){
    console.log("applyZoom", zoomTo);
    var zoom = zoomTo ? parseInt(zoomTo) : parseInt(iFrameDiv.getAttribute('data-zoom'))

    if(!zoom) return;
    var shinkby = 100.0 - zoom
    console.log("shinkby", shinkby);
    var zoomPct = zoom + '%'
    var divPct = (100.0 + Math.trunc(100 * shinkby/zoom)) + '%'

    iFrameDiv.style.width = divPct
    iframe.style.zoom = zoom/100
    iframe.style.height = divPct
    iframe.style['-webkit-transform'] = 'scale(' + zoom/100 + ')'
    iframe.style['-moz-transform'] = 'scale(' + zoom/100 + ')'
    iframe.style['transform'] = 'scale(' + zoom/100 + ')'

    iframe.style['-webkit-transform-origin'] = '0 0'
    iframe.style['-moz-transform-origin'] = '0 0'
    iframe.style['transform-origin'] = '0 0'

    console.log("setAttribute zoom", zoom);
    iFrameDiv.setAttribute('data-zoom', zoom)
  }

  function zoomInc(iFrameDiv, zoomIncrement){
    console.log("zoomInc start", iFrameDiv, zoomIncrement);
    var iframe = $(iFrameDiv).find('iframe').get(0)
    var zoom = parseInt(iFrameDiv.getAttribute('data-zoom'))
    console.log("zoomInc getAttribute", zoom);
    if(!zoom) zoom = 100
    zoom = zoomIncrement + zoom
    console.log("zoom after inc calling applyZoom", iFrameDiv, zoom);
    applyZoom(iFrameDiv,iframe,zoom)
  }

  function createToolbar(divFrame){
    var $tbar = $('<header class="mdc-toolbar small transparent"> \
      <div class="mdc-toolbar__row"> \
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start"> \
          <span class="mdc-toolbar__title mdc-theme-text-primary-on-background"></span> \
        </section> \
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar"> \
          <a href="#" class="material-icons mdc-toolbar__icon zoom_out" title="Zoom in">zoom_out</a> \
          <a href="#" class="material-icons mdc-toolbar__icon zoom_in" title="Zoom out">zoom_in</a> \
          <a href="#" class="material-icons mdc-toolbar__icon view" title="View full size">launch</a> \
          <a href="#" class="material-icons mdc-toolbar__icon edit" title="Edit Online">edit</a> \
        </section> \
      </div> \
    </header>')
    $(divFrame).prepend($tbar)
    return $tbar
  }

  function toolbarEvents(iFrameDiv, toolbar, docProps){
    if(!toolbar) return

    $(toolbar).find('.view').click(function(e) {
      e.preventDefault();
      window.open(docProps.ReloadUrl, '_blank')
    });
    $(toolbar).find('.edit').click(function(e) {
      e.preventDefault();
      window.open(docProps.ReloadUrl.replace('view.aspx?', 'edit.aspx?'), '_blank')
    });
    $(toolbar).find('.zoom_out').click(function(e) {
      e.preventDefault();
      zoomInc(iFrameDiv, (-10.0))
    });
    $(toolbar).find('.zoom_in').click(function(e) {
      e.preventDefault();
      zoomInc(iFrameDiv, 10.0)
    });

  }

});





function configExcelToolbar(innerDoc,viewUrl){
  var toolbar = $(innerDoc).find("[id$='_m_ewaEmbedViewerBar']")
  //console.log("bar", bar)

  toolbar.css("background-image","none");
  toolbar.css("background-color","#999");
  toolbar.find('.ewa-embed-branding-anchor').remove()
  toolbar.find('.ewa-embed-buttons .ewa-embed-anchor-button').remove()

  var theHtml = '<a id="m_excelEmbedRenderer_m_edit" tabindex="0" role="button" class="ewa-embed-anchor-button" \
   onclick="return false;">\
   foo \
   </a>';

  toolbar.find('.ewa-embed-buttons').append( theHtml);

  // addViewEditButton
  // var theHtml = '<a id="m_excelEmbedRenderer_m_edit" tabindex="0" role="button" class="ewa-embed-anchor-button" onclick="return false;"><div class="clip22x22" style="height:20px">'
  // theHtml = theHtml + '<img src="https://s2-powerpoint-15.cdn.office.net/p/s/1684127225_PptResources/1033/prt.png" '
  // theHtml = theHtml + 'style="top:-293px;left:-205px;" alt="Edit Workbook Online" title="View full-size workbook">'
  // theHtml = theHtml + '</div></a>'
  // theHtml = theHtml + '<a id="m_excelEmbedRenderer_m_hostViewAnchor" tabindex="0" role="button" class="ewa-embed-anchor-button" onclick="return false;"><div class="clip22x22" style="height:20px">'
  // theHtml = theHtml + '<img src="https://s2-powerpoint-15.cdn.office.net/p/s/1684127225_PptResources/1033/prt.png" '
  // theHtml = theHtml + 'style="top:-222px;left:-303px;" alt="View full-size workbook" title="View full-size workbook">'
  // theHtml = theHtml + '</div></a>'
  // toolbar.find('.ewa-embed-buttons').append( theHtml);
  // toolbar.find('#m_excelEmbedRenderer_m_hostViewAnchor').click(function() {
  //   window.open(viewUrl, '_blank');
  // });
  // toolbar.find('#m_excelEmbedRenderer_m_edit').click(function() {
  //   window.open(viewUrl.replace('view.aspx?', 'edit.aspx?'), '_blank');
  // });
}


/****** DO THE HEADROOM TOP BAR  ******/
$(function() {

  $("#header-docs").headroom({
    // vertical offset in px before element is first unpinned
    offset : 100,
    // or you can specify tolerance individually for up/down scroll
    tolerance : {
        up : 15,
        down : 0
    }
  });
  $("#header-website").headroom({
    // vertical offset in px before element is first unpinned
    offset : 100,
    // or you can specify tolerance individually for up/down scroll
    tolerance : {
        up : 15,
        down : 0
    }
  });

});
