AUI.add("aui-dialog-iframe",function(c){var h=c.Lang,d=c.ClassNameManager.getClassName,g="iframe",k=d("dialog",g,"node"),f=[k],i="<div></div>",b='<iframe class="{cssClass}" frameborder="0" id="{id}" name="{id}" src="{uri}"></iframe>',e=c.Widget.UI_SRC,j={src:e};var a=c.Component.create({ATTRS:{closeOnEscape:{value:true},iframeCssClass:{value:"",setter:"_setIframeCssClass"},iframeId:{valueFn:function(){return c.guid();}},originalParent:{setter:"_setOriginalParent"},uri:{}},EXTENDS:c.Plugin.Base,NAME:g,NS:g,prototype:{initializer:function(m){var l=this;l._host=l.get("host");l.publish("load",{defaultFn:l._defaultLoadIframeFn});l.afterHostMethod("renderUI",l.renderUI);l.afterHostMethod("bindUI",l.bindUI);l.afterHostMethod("render",l._afterRender);},renderUI:function(){var l=this;l._previousBodyContent=l._host.get("bodyContent");var o=c.Node.create(i);var m=h.sub(b,{cssClass:l.get("iframeCssClass"),id:l.get("iframeId"),uri:l.get("uri")});var n=c.Node.create(m);o.append(n);l._host.set("bodyContent",o);l._bodyNode=l._host.bodyNode;l.node=n;},bindUI:function(){var l=this;l.afterHostEvent("heightChange",l._updateIframeSize,l);l.afterHostEvent("widthChange",l._updateIframeSize,l);l.after("uriChange",l._afterUriChange);l.node.on("load",c.bind(l.fire,l,"load"));},destructor:function(){var l=this;l._host.set("bodyContent",l._previousBodyContent);l.node.remove(true);},_adjustSize:c.cached(function(l){return((parseInt(l,10)||0)-5);}),_afterRender:function(){var l=this;l._bodyNode.plug(c.LoadingMask).loadingmask.show();l._setOriginalParent(l.get("originalParent"));},_afterUriChange:function(m){var l=this;if(m.src!=e){l._uiSetUri(m.newVal);}},_defaultLoadIframeFn:function(o){var l=this;var n=l.node;try{var q=n.get("contentWindow.document");q.get("documentElement").setStyle("overflow","visible");var m=q.get("body");n.set("height",m.get("scrollHeight")+5);l.set("uri",q.get("location.href"),j);if(l.get("closeOnEscape")){c.on("key",function(r){l._host.close();},[q],"down:27");}}catch(p){}l._bodyNode.loadingmask.hide();},_setIframeCssClass:function(l){f[1]=l;return f.join(" ");},_setOriginalParent:function(n){var l=this;var m=l.node;if(m){m.setData("originalParent",n);}return n;},_uiSetUri:function(m){var l=this;if(l._bodyNode.loadingmask){l._bodyNode.loadingmask.show();}l.node.attr("src",m);},_updateIframeSize:function(p){var l=this;var n=l._adjustSize;var m=l._bodyNode;var o=l.node;var q=l._updateIframeSizeUI;if(!q){q=function(){var r=m.getStyle("height");o.setStyle("height",n(r));m.loadingmask.refreshMask();};l._updateIframeSizeUI=q;}setTimeout(q,50);}}});c.Plugin.DialogIframe=a;},"@VERSION@",{requires:["aui-base","aui-loading-mask","plugin"],skinnable:true});