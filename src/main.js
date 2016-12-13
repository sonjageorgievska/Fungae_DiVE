//################# global variables definitions start here


        var loadFirstTime = true; //keeps track of whether the frame was loaded for the first time
        var frameStartsAt = 0;//285 pixels 
        var sizeAtShow = document.getElementById("sizeattenuation");
        var myColorpicker;//UI
        var cursorX;//used in Popup message for UI
        var cursorY;//used in Popup message for UI
        var myPop = new dhtmlXPopup();//UI, the popup message that is displayed when hovering over a node          
        var previoslyhoveredNode;//hovering changes temporarily the color of a node to white, therefore we need to remember this
        var previosHoveredcolor;//the color of previoslyhoveredNode
        var node_size = 2;//0.016;
        var size_attenuation = true; //whether nodes closer to camera appear bigger (3d effect)
        var graph = InitializeGraph();//the graph is what is rendered, points are nodes of the graph. Optionally the graph can contain edges    
        var selectedPropertyIndex;//holds the index of the most recently selected numerical property (by the user)
        var previousColor = [];//a list of previous colors of nodes in graph, used in `resume colors`. Could be made a property of the node       
        var priority = DefinePrioritiesOfOperators();//for each boolean operator AND, OR and NOT used in the search
        var searchExprWellDefined;//holds whether the search expression entered by the user is well defined
        var allNodes = [];//keeps all nodes, to be able to switch easily between "show only found nodes" and "show all nodes"
        var foundNodes=[]; //keeps the nodes that were found in the last search
        var pointsSet;
        var old_d = undefined;// used in determining the mouse zoom speed 
        var start_zoomin_factor = 1;
        //do not change this constant by any means. It defines the node image
        const discImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMNDyATS0xXswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEzklEQVRYw7VXS08bZxQ9ngfGHoNrMg6uMU2omzQUgypYWBZCRq2ya9Vu2CAqVJVFV/kBbPgBbPgBRIoQKGWXX1AlhJeQQK6EXGweMSHEJib4NYYxnkcXvYMmrhsDMVe6sjQz8jn33u/e71wLrm9MlWfaVf/Ecg1A5hIEtMsS4i4JbDhncgYAS9/oBKZUeM3McJcEbgDQCMAKwA7ARs7SewVAGcAZgBIAiX5lExHtKiUwR2wHIPT19XlHRkaCDx48+Nbn83WKotim67pFluVyIpHYj0ajr16+fBmdn5+PAjghLwAoEhHN5B8lYIA3ArCHQqG2sbGxh6FQ6KfW1tb7PM/beJ63NjY2cgCgaZouy7JSKpXK+Xxe2tjY2JqZmfnz2bNnGwBSAI4B5ACcUja0j5XEiNoB4POhoaHvFhYW5k5OTo5lWT7Xa5iqqrokSefRaDQ5Pj7+B4BfAYQB3AMgUlBcLXA7gNZHjx79EI/HFyVJKuhXNEVRtIODg/zjx48XAfwO4CGRaKHzdNFBbEU5eADC8PBw5+jo6G9dXV3f22w225UHBMNYHA6HVRTFWwzDWFdWVtJ0KA1Xje5hK+seDofbhoeHfx4cHPzlOuAX0VgscDgcvMfjcW9tbZ3u7+8b50A2nwWmoiVt3d3dXwWDwR8FQXDgE41lWYvf728eGRkJAvgCgAeAk8rwb7LMLRcOh92hUCjk8/m+Rp1MEAS2v7/f19/fHyACn9E84SrHaqPH42m9e/duT0NDQ0O9CDAMg5aWFmswGPySCLRQl3FGBgwCvMvlcnu93nuos9ntdqanp+c2AFe1DFyMW4fD4fJ6ve31JiAIAhMIBJwAmgE00Rj/TwY4VVWt9Uy/uQw0Oe0UPW+MgA+uVE3TGNyQ6bpuIVDePA0/AMxms6epVOp9vcGLxaK+u7tb9UJiTA+Uo6OjQiKReHsTBCKRiATg3DQJ9coMKKlUKhOPx1/dAAFtbW0tRzqhSCQU8yRUAJQ2NzffvXjx4q/Dw8NsnaM/W1paSgLI0NVcNIQKY1IriqIo0urq6tbz588j9SJwfHysPn36NJXL5Y4ApImEoQ3AUi0u2jGTybCyLHMdHR0d7e3tzk8BT6fT2uzs7MmTJ09ipVJpB8A2gNcAsiTfVLayZTVNYw8ODsrlcpnv7e31O51O63VTv7CwUJyYmIil0+ltAHEAOwCSdBbKZgI66QEdgK4oCmKx2GkymdREURTv3LnTdNXIp6enM5OTkzt7e3sxAo9XRm/WA2b5rAHQy+WyGovF8tvb27IkSVZRFJtcLhdfK+rFxcWzqamp5Nzc3O7e3t7fBBwDsE9nwKi/Wk2UmmWZC0AbwzAdXq/3m0Ag0DkwMHA/EAi4u7q6mvx+v9UA3dzclCORyNn6+np+eXn53Zs3b1K5XO41gASl/TUJ1EKFQv5fVWyQcAK4DcDLcVy72+3ucDqdnubm5hZBEJo0TeNVVbXk8/nzQqEgZTKZbDabTQM4AnBI/hbA+2rgtfYCjpRLE2VDJL9FxBx0sbCU0jPq8QwBpmk3MKTY+WX3gsr9wNiKbERGIHAbXSzGOC8RkETRSkTq/GP7QK3ltNpe2GASFGaNrxBY2SQ8ay4il92OmQr5xlRZMLQqt51Wa0P+B2VKXoQbgAy9AAAAAElFTkSuQmCC"
        //################# global variables definitions end here

        //################# global code starts here

        InitEventHandlers();
        InitGlobalDataVariables();
        defineColorPicker2();
        LoadLocalDataSetDefault();
        LoadLocalDataSet();

        //Updates the cursorX and cursorY every time the mouse is moved                 
        document.onmousemove =         
        function (e) {//we have to track where the mouse is for the pop-up message
            cursorX = e.clientX;
            cursorY = e.clientY;
        }

        //Hides the pop up message resulting from hovering when a user clicks on the document
        document.onclick =        
        function (e) {
            myPop.hide();
        }

        //################## global code ends here
