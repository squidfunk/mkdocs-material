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

function buildAdmonition(el){

}

function callouts(){

}

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
        panel.find('> :last-child').css('margin-bottom','.5rem')
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

});
