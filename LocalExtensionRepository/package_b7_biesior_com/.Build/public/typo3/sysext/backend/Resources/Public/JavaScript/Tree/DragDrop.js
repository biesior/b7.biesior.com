/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var s=Object.getOwnPropertyDescriptor(t,o);s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,s)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&__createBinding(t,e,o);return __setModuleDefault(t,e),t};define(["require","exports","lit","TYPO3/CMS/Core/lit-helper","d3-drag","d3-selection"],(function(e,t,o,r,s,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DragDrop=t.DraggablePositionEnum=void 0,s=__importStar(s),d=__importStar(d);var n;!function(e){e.INSIDE="inside",e.BEFORE="before",e.AFTER="after"}(n=t.DraggablePositionEnum||(t.DraggablePositionEnum={}));class a{constructor(e){this.timeout={},this.minimalDistance=10,this.tree=e}static setDragStart(){document.querySelectorAll("iframe").forEach(e=>e.style.pointerEvents="none")}static setDragEnd(){document.querySelectorAll("iframe").forEach(e=>e.style.pointerEvents="")}connectDragHandler(e){return s.drag().filter(e=>e instanceof MouseEvent).clickDistance(5).on("start",(function(t){e.dragStart(t)&&a.setDragStart()})).on("drag",(function(t){e.dragDragged(t)})).on("end",(function(t){a.setDragEnd(),e.dragEnd(t)}))}createDraggable(e,t){var s;let d=this.tree.svg.node();const n=(0,r.renderNodes)(class{static get(e,t){return o.html`<div class="node-dd node-dd--nodrop">
        <div class="node-dd__ctrl-icon"></div>
        <div class="node-dd__text">
            <span class="node-dd__icon">
                <svg aria-hidden="true" style="width: 16px; height: 16px">
                    <use xlink:ref="${e}"></use>
                </svg>
            </span>
            <span class="node-dd__name">${t}</span>
        </div>
    </div>`}}.get(e,t));d.after(...n),null===(s=this.tree.svg.node().querySelector(".nodes-wrapper"))||void 0===s||s.classList.add("nodes-wrapper--dragging")}updateDraggablePosition(e){let t=18,o=15;e.sourceEvent&&e.sourceEvent.pageX&&(t+=e.sourceEvent.pageX),e.sourceEvent&&e.sourceEvent.pageY&&(o+=e.sourceEvent.pageY),document.querySelectorAll(".node-dd").forEach(e=>{e.style.top=o+"px",e.style.left=t+"px",e.style.display="block"})}openNodeTimeout(){null!==this.tree.hoveredNode&&this.tree.hoveredNode.hasChildren&&!this.tree.hoveredNode.expanded?this.timeout.node!=this.tree.hoveredNode&&(this.timeout.node=this.tree.hoveredNode,clearTimeout(this.timeout.time),this.timeout.time=setTimeout(()=>{this.tree.hoveredNode&&(this.tree.showChildren(this.tree.hoveredNode),this.tree.prepareDataForVisibleNodes(),this.tree.updateVisibleNodes())},1e3)):clearTimeout(this.timeout.time)}changeNodeClasses(e){const t=this.tree.svg.select(".node-over"),o=this.tree.svg.node().parentNode.querySelector(".node-dd");let r=this.tree.nodesBgContainer.selectAll(".node-bg__border");if(t.size()&&this.tree.isOverSvg){r.empty()&&(r=this.tree.nodesBgContainer.append("rect").attr("class","node-bg__border").attr("height","1px").attr("width","100%"));let s=d.pointer(e,t.node())[1];if(s<3){r.attr("transform","translate(-8, "+(this.tree.hoveredNode.y-10)+")").style("display","block"),0===this.tree.hoveredNode.depth?this.addNodeDdClass(o,"nodrop"):this.tree.hoveredNode.firstChild?this.addNodeDdClass(o,"ok-above"):this.addNodeDdClass(o,"ok-between"),this.tree.settings.nodeDragPosition=n.BEFORE}else if(s>17)if(r.style("display","none"),this.tree.hoveredNode.expanded&&this.tree.hoveredNode.hasChildren)this.addNodeDdClass(o,"ok-append"),this.tree.settings.nodeDragPosition=n.INSIDE;else{r.attr("transform","translate(-8, "+(this.tree.hoveredNode.y+10)+")").style("display","block"),this.tree.hoveredNode.lastChild?this.addNodeDdClass(o,"ok-below"):this.addNodeDdClass(o,"ok-between"),this.tree.settings.nodeDragPosition=n.AFTER}else r.style("display","none"),this.addNodeDdClass(o,"ok-append"),this.tree.settings.nodeDragPosition=n.INSIDE}else this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.addNodeDdClass(o,"nodrop")}addNodeDdClass(e,t){const o=this.tree.svg.node().querySelector(".nodes-wrapper");e&&this.applyNodeClassNames(e,"node-dd--",t),o&&this.applyNodeClassNames(o,"nodes-wrapper--",t),this.tree.settings.canNodeDrag="nodrop"!==t}removeNodeDdClass(){var e;const t=this.tree.svg.node().querySelector(".nodes-wrapper");["nodes-wrapper--nodrop","nodes-wrapper--ok-append","nodes-wrapper--ok-below","nodes-wrapper--ok-between","nodes-wrapper--ok-above","nodes-wrapper--dragging"].forEach(e=>t.classList.remove(e)),null===(e=this.tree.nodesBgContainer.node().querySelector(".node-bg.node-bg--dragging"))||void 0===e||e.classList.remove("node-bg--dragging"),this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.tree.svg.node().parentNode.querySelector(".node-dd").remove()}isDragNodeDistanceMore(e,t){return t.startDrag||t.startPageX-this.minimalDistance>e.sourceEvent.pageX||t.startPageX+this.minimalDistance<e.sourceEvent.pageX||t.startPageY-this.minimalDistance>e.sourceEvent.pageY||t.startPageY+this.minimalDistance<e.sourceEvent.pageY}applyNodeClassNames(e,t,o){["nodrop","ok-append","ok-below","ok-between","ok-above","dragging"].forEach(o=>e.classList.remove(t+o)),e.classList.add(t+o)}}t.DragDrop=a}));