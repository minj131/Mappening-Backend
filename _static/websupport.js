!function(e){e.fn.autogrow=function(){return this.each(function(){var t=this;e.fn.autogrow.resize(t),e(t).focus(function(){t.interval=setInterval(function(){e.fn.autogrow.resize(t)},500)}).blur(function(){clearInterval(t.interval)})})},e.fn.autogrow.resize=function(t){var n=parseInt(e(t).css("line-height"),10),a=t.value.split("\n"),i=t.cols,o=0;e.each(a,function(){o+=Math.ceil(this.length/i)||1});var s=n*(o+1);e(t).css("height",s)}}(jQuery),function(e){var t,n;function a(){e(document).on("click","a.comment-close",function(t){t.preventDefault(),s(e(this).attr("id").substring(2))}),e(document).on("click","a.vote",function(t){t.preventDefault(),function(t){if(v.voting){var n=t.attr("id");if(n){var a=0;"u"!=n.charAt(1)&&(a="u"==n.charAt(0)?1:-1);var i={comment_id:n.substring(2),value:a};t.hide(),e("#"+n.charAt(0)+("u"==n.charAt(1)?"v":"u")+i.comment_id).show();var o=e("div#cd"+i.comment_id),s=o.data("comment");0!==i.value&&s.vote===-1*i.value&&(e("#"+(1==i.value?"d":"u")+"u"+i.comment_id).hide(),e("#"+(1==i.value?"d":"u")+"v"+i.comment_id).show()),s.rating+=0===s.vote?i.value:i.value-s.vote,s.vote=i.value,o.data("comment",s),o.find(".rating:first").text(s.rating+" point"+(1==s.rating?"":"s")),e.ajax({type:"POST",url:v.processVoteURL,data:i,error:function(e,t,n){h("Oops, there was a problem casting that vote.")}})}}else h("You'll need to login to vote.")}(e(this))}),e(document).on("click","a.reply",function(t){t.preventDefault(),function(t){e("#rl"+t).hide(),e("#cr"+t).show();var n=e(f(b,{id:t})).hide();e("#cl"+t).prepend(n).find("#rf"+t).submit(function(n){n.preventDefault(),c(e("#rf"+t)),l(t)}).find("input[type=button]").click(function(){l(t)}),n.slideDown("fast",function(){e("#rf"+t).find("textarea").focus()})}(e(this).attr("id").substring(2))}),e(document).on("click","a.close-reply",function(t){t.preventDefault(),l(e(this).attr("id").substring(2))}),e(document).on("click","a.sort-option",function(t){t.preventDefault(),function(t){for(var a=t.attr("class").split(/\s+/),o=0;o<a.length;o++)"sort-option"!=a[o]&&(n=a[o].substring(2));i();var s=new Date;s.setDate(s.getDate()+365),document.cookie="sortBy="+escape(n)+";expires="+s.toUTCString(),e("ul.comment-ul").each(function(t,n){var a=u(e(n),!0);r(a=m(a),e(n).empty())})}(e(this))}),e(document).on("click","a.show-proposal",function(t){var n;t.preventDefault(),n=e(this).attr("id").substring(2),e("#sp"+n).hide(),e("#hp"+n).show(),e("#pr"+n).slideDown("fast")}),e(document).on("click","a.hide-proposal",function(t){var n;t.preventDefault(),n=e(this).attr("id").substring(2),e("#hp"+n).hide(),e("#sp"+n).show(),e("#pr"+n).slideUp("fast")}),e(document).on("click","a.show-propose-change",function(t){t.preventDefault(),function(t){e("#pc"+t).hide(),e("#hc"+t).show();var n=e("#pt"+t);n.val(n.data("source")),e.fn.autogrow.resize(n[0]),n.slideDown("fast")}(e(this).attr("id").substring(2))}),e(document).on("click","a.hide-propose-change",function(t){t.preventDefault(),d(e(this).attr("id").substring(2))}),e(document).on("click","a.accept-comment",function(t){var n;t.preventDefault(),n=e(this).attr("id").substring(2),e.ajax({type:"POST",url:v.acceptCommentURL,data:{id:n},success:function(t,a,i){e("#cm"+n).fadeOut("fast"),e("#cd"+n).removeClass("moderate")},error:function(e,t,n){h("Oops, there was a problem accepting the comment.")}})}),e(document).on("click","a.delete-comment",function(t){var n;t.preventDefault(),n=e(this).attr("id").substring(2),e.ajax({type:"POST",url:v.deleteCommentURL,data:{id:n},success:function(t,a,i){var o=e("#cd"+n);if("delete"!=t){o.find("span.user-id:first").text("[deleted]").end().find("div.comment-text:first").text("[deleted]").end().find("#cm"+n+", #dc"+n+", #ac"+n+", #rc"+n+", #sp"+n+", #hp"+n+", #cr"+n+", #rl"+n).remove();var s=o.data("comment");s.username="[deleted]",s.text="[deleted]",o.data("comment",s)}else o.slideUp("fast",function(){o.remove()})},error:function(e,t,n){h("Oops, there was a problem deleting the comment.")}})}),e(document).on("click","a.comment-markup",function(t){var n;t.preventDefault(),n=e(this).attr("id").substring(2),e("#mb"+n).toggle()}),function(){if(n="rating",document.cookie.length>0){var e=document.cookie.indexOf("sortBy=");if(-1!=e){e+=7;var t=document.cookie.indexOf(";",e);-1==t&&(t=document.cookie.length,n=unescape(document.cookie.substring(e,t)))}}i()}()}function i(){if("asc"==n.substring(0,3)){var a=n.substring(3);t=function(e,t){return e[a]-t[a]}}else t=function(e,t){return t[n]-e[n]};e("a.sel").attr("href","#").removeClass("sel"),e("a.by"+n).removeAttr("href").addClass("sel")}function o(t){e("#ao"+t).hide(),e("#ah"+t).show();var a=e.extend({id:t},v),i=e(f(g,a)).hide();i.find('textarea[name="proposal"]').hide(),i.find("a.by"+n).addClass("sel");var o=i.find("#cf"+t);o.submit(function(e){e.preventDefault(),c(o)}),e("#s"+t).after(i),i.slideDown("fast",function(){var n;n=t,e.ajax({type:"GET",url:v.getCommentsURL,data:{node:n},success:function(t,a,i){var o=e("#cl"+n),s=100;if(e("#cf"+n).find('textarea[name="proposal"]').data("source",t.source),0===t.comments.length)o.html("<li>No comments yet.</li>"),o.data("empty",!0);else{var c=m(t.comments);s=100*t.comments.length,r(c,o),o.data("empty",!1)}e("#cn"+n).slideUp(s+200),o.slideDown(s)},error:function(e,t,n){h("Oops, there was a problem retrieving the comments.")},dataType:"json"})})}function s(t){e("#ah"+t).hide(),e("#ao"+t).show();var n=e("#sc"+t);n.slideUp("fast",function(){n.remove()})}function c(n){var a=n.find('input[name="node"]').val(),i=n.find('input[name="parent"]').val(),o=n.find('textarea[name="comment"]').val(),s=n.find('textarea[name="proposal"]').val();""!=o?(n.find("textarea,input").attr("disabled","disabled"),e.ajax({type:"POST",url:v.addCommentURL,dataType:"json",data:{node:a,parent:i,text:o,proposal:s},success:function(o,s,c){a&&d(a),n.find("textarea").val("").add(n.find("input")).removeAttr("disabled");var r=e("#cl"+(a||i));r.data("empty")&&(e(r).empty(),r.data("empty",!1)),function(n){var a=p(n);n.children=null,a.data("comment",n);var i=e("#cl"+(n.node||n.parent)),o=u(i),s=e(document.createElement("li"));s.hide();for(var c=0;c<o.length;c++)if(t(n,o[c])<=0)return e("#cd"+o[c].id).parent().before(s.html(a)),void s.slideDown("fast");i.append(s.html(a)),s.slideDown("fast")}(o.comment),e("#ao"+a).find("img").attr({src:v.commentBrightImage}),a&&e("#ca"+a).slideUp()},error:function(e,t,a){n.find("textarea,input").removeAttr("disabled"),h("Oops, there was a problem adding the comment.")}})):h("Please enter a comment.")}function r(t,n){e.each(t,function(){var t=p(this);n.append(e(document.createElement("li")).html(t)),r(this.children,t.find("ul.comment-children")),this.children=null,t.data("comment",this)})}function d(t){e("#hc"+t).hide(),e("#pc"+t).show();var n=e("#pt"+t);n.val("").removeAttr("disabled"),n.slideUp("fast")}function l(t){e("#rd"+t).slideUp("fast",function(){e(this).remove()}),e("#cr"+t).hide(),e("#rl"+t).show()}function m(n){return n.sort(t),e.each(n,function(){this.children=m(this.children)}),n}function u(t,n){var a=[];return t.children().children("[id^='cd']").each(function(){var t=e(this).data("comment");n&&(t.children=u(e(this).find("#cl"+t.id),!0)),a.push(t)}),a}function p(t){if(!t.displayed&&!v.moderator)return e('<div class="moderate">Thank you!  Your comment will show up once it is has been approved by a moderator.</div>');t.pretty_rating=t.rating+" point"+(1==t.rating?"":"s"),t.css_class=t.displayed?"":" moderate";var n=e.extend({},v,t),a=e(f(w,n));if(t.vote){var i=1==t.vote?"u":"d";a.find("#"+i+"v"+t.id).hide(),a.find("#"+i+"u"+t.id).show()}return(v.moderator||"[deleted]"!=t.text)&&(a.find("a.reply").show(),t.proposal_diff&&a.find("#sp"+t.id).show(),v.moderator&&!t.displayed&&a.find("#cm"+t.id).show(),(v.moderator||v.username==t.username)&&a.find("#dc"+t.id).show()),a}function f(t,n){var a=e(document.createElement("div"));return t.replace(/<([%#])([\w\.]*)\1>/g,function(){return t=arguments[2],i="%"==arguments[1],o=n,e.each(t.split("."),function(){o=o[this]}),i?a.text(o||"").html():o;var t,i,o})}function h(t){e(document.createElement("div")).attr({class:"popup-error"}).append(e(document.createElement("div")).attr({class:"error-message"}).text(t)).appendTo("body").fadeIn("slow").delay(2e3).fadeOut("slow")}e.fn.comment=function(){return this.each(function(){var t=e(this).attr("id").substring(1),n=COMMENT_METADATA[t],a=n+" comment"+(1==n?"":"s"),i=n>0?v.commentBrightImage:v.commentImage,c=0==n?" nocomment":"";e(this).append(e(document.createElement("a")).attr({href:"#",class:"sphinx-comment-open"+c,id:"ao"+t}).append(e(document.createElement("img")).attr({src:i,alt:"comment",title:a})).click(function(t){t.preventDefault(),o(e(this).attr("id").substring(2))})).append(e(document.createElement("a")).attr({href:"#",class:"sphinx-comment-close hidden",id:"ah"+t}).append(e(document.createElement("img")).attr({src:v.closeCommentImage,alt:"close",title:"close"})).click(function(t){t.preventDefault(),s(e(this).attr("id").substring(2))}))})};var v={processVoteURL:"/_process_vote",addCommentURL:"/_add_comment",getCommentsURL:"/_get_comments",acceptCommentURL:"/_accept_comment",deleteCommentURL:"/_delete_comment",commentImage:"/static/_static/comment.png",closeCommentImage:"/static/_static/comment-close.png",loadingImage:"/static/_static/ajax-loader.gif",commentBrightImage:"/static/_static/comment-bright.png",upArrow:"/static/_static/up.png",downArrow:"/static/_static/down.png",upArrowPressed:"/static/_static/up-pressed.png",downArrowPressed:"/static/_static/down-pressed.png",voting:!1,moderator:!1};"undefined"!=typeof COMMENT_OPTIONS&&(v=jQuery.extend(v,COMMENT_OPTIONS));var g='    <div class="sphinx-comments" id="sc<%id%>">      <p class="sort-options">        Sort by:        <a href="#" class="sort-option byrating">best rated</a>        <a href="#" class="sort-option byascage">newest</a>        <a href="#" class="sort-option byage">oldest</a>      </p>      <div class="comment-header">Comments</div>      <div class="comment-loading" id="cn<%id%>">        loading comments... <img src="<%loadingImage%>" alt="" /></div>      <ul id="cl<%id%>" class="comment-ul"></ul>      <div id="ca<%id%>">      <p class="add-a-comment">Add a comment        (<a href="#" class="comment-markup" id="ab<%id%>">markup</a>):</p>      <div class="comment-markup-box" id="mb<%id%>">        reStructured text markup: <i>*emph*</i>, <b>**strong**</b>,         <code>``code``</code>,         code blocks: <code>::</code> and an indented block after blank line</div>      <form method="post" id="cf<%id%>" class="comment-form" action="">        <textarea name="comment" cols="80"></textarea>        <p class="propose-button">          <a href="#" id="pc<%id%>" class="show-propose-change">            Propose a change &#9657;          </a>          <a href="#" id="hc<%id%>" class="hide-propose-change">            Propose a change &#9663;          </a>        </p>        <textarea name="proposal" id="pt<%id%>" cols="80"                  spellcheck="false"></textarea>        <input type="submit" value="Add comment" />        <input type="hidden" name="node" value="<%id%>" />        <input type="hidden" name="parent" value="" />      </form>      </div>    </div>',w='    <div id="cd<%id%>" class="sphinx-comment<%css_class%>">      <div class="vote">        <div class="arrow">          <a href="#" id="uv<%id%>" class="vote" title="vote up">            <img src="<%upArrow%>" />          </a>          <a href="#" id="uu<%id%>" class="un vote" title="vote up">            <img src="<%upArrowPressed%>" />          </a>        </div>        <div class="arrow">          <a href="#" id="dv<%id%>" class="vote" title="vote down">            <img src="<%downArrow%>" id="da<%id%>" />          </a>          <a href="#" id="du<%id%>" class="un vote" title="vote down">            <img src="<%downArrowPressed%>" />          </a>        </div>      </div>      <div class="comment-content">        <p class="tagline comment">          <span class="user-id"><%username%></span>          <span class="rating"><%pretty_rating%></span>          <span class="delta"><%time.delta%></span>        </p>        <div class="comment-text comment"><#text#></div>        <p class="comment-opts comment">          <a href="#" class="reply hidden" id="rl<%id%>">reply &#9657;</a>          <a href="#" class="close-reply" id="cr<%id%>">reply &#9663;</a>          <a href="#" id="sp<%id%>" class="show-proposal">proposal &#9657;</a>          <a href="#" id="hp<%id%>" class="hide-proposal">proposal &#9663;</a>          <a href="#" id="dc<%id%>" class="delete-comment hidden">delete</a>          <span id="cm<%id%>" class="moderation hidden">            <a href="#" id="ac<%id%>" class="accept-comment">accept</a>          </span>        </p>        <pre class="proposal" id="pr<%id%>"><#proposal_diff#>        </pre>          <ul class="comment-children" id="cl<%id%>"></ul>        </div>        <div class="clearleft"></div>      </div>    </div>',b='    <li>      <div class="reply-div" id="rd<%id%>">        <form id="rf<%id%>">          <textarea name="comment" cols="80"></textarea>          <input type="submit" value="Add reply" />          <input type="button" value="Cancel" />          <input type="hidden" name="parent" value="<%id%>" />          <input type="hidden" name="node" value="" />        </form>      </div>    </li>';e(document).ready(function(){a()})}(jQuery),$(document).ready(function(){$(".sphinx-has-comment").comment(),$("div.context").each(function(){var e=$.getQueryParameters(),t=e.q?e.q[0].split(/\s+/):[],n=$(this);$.each(t,function(){n.highlightText(this.toLowerCase(),"highlighted")})});var e=document.location.hash;"#comment-"==e.substring(0,9)&&($("#ao"+e.substring(9)).click(),document.location.hash="#s"+e.substring(9))});