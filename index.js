import arrData from "./data.js";
var dataTable = {
    GLOBAL: {
        listData: arrData,
        set: 0,
        currentPage: 1,
        allPage: 0,
        itemPerPage: 10,
        currentSortProperty: 0,
        iconActive: 2,
    },
  
    CONSTS: {},
  
    SELECTORS: {
        table: ".data-table-container table tbody",
        table_item: "tr td",
        paginate_button: ".paginate-button",
        prev_button: ".paginate-button .prev-button",
        next_button: ".paginate-button .next-button",
        page_button: ".paginate-button .page-button",
        select_entries: "select",
        icon_container: ".icon-container",
        icon: ".icon-container .icon",
        input_text: ".search-data input"
    },

    init: function () {
        dataTable.sortData();
        dataTable.renderTable();
        dataTable.renderPageButton();
        dataTable.selectEvent();
        dataTable.pageChangeEvent();
        dataTable.propertyChange();
        dataTable.search();
    },

    renderTable: function() {
        let html = "";
        let index = (dataTable.GLOBAL.currentPage-1) * dataTable.GLOBAL.itemPerPage;
        let dem = dataTable.GLOBAL.itemPerPage;
        while(dem > 0) {
            html += `<tr>
                <td>${dataTable.GLOBAL.listData[index].rendering_engine}</td>
                <td>${dataTable.GLOBAL.listData[index].browser}</td>
                <td>${dataTable.GLOBAL.listData[index].platform}</td>
                <td>${dataTable.GLOBAL.listData[index].engine_version}</td>
                <td>${dataTable.GLOBAL.listData[index].css_grade}</td>
            </tr>`
            index ++;
            dem--;
            if(index >= dataTable.GLOBAL.listData.length) break;
        }
        $(dataTable.SELECTORS.table).html(html);
        
    },

    renderPageButton: function() {
        dataTable.GLOBAL.allPage = dataTable.GLOBAL.listData.length / dataTable.GLOBAL.itemPerPage;
        dataTable.GLOBAL.allPage = Math.ceil(dataTable.GLOBAL.allPage);
        let html = "";
        html += ` <li>
                    <a class ="prev-button">Previous</a>
                </li>`;
        for(let i = 0; i < dataTable.GLOBAL.allPage; i++) {
            html += `<li>
                        <a class="page-button" index="${i}">${i+1}</a>
                    </li>`
        }
        html += `<li>
                    <a class ="next-button">Next</a>
                </li>`
        $(dataTable.SELECTORS.paginate_button).html(html);
    },

    pageChangeEvent: function() {
        $(dataTable.SELECTORS.next_button).on("click", function () {
            let nextPage = dataTable.GLOBAL.currentPage >= dataTable.GLOBAL.allPage ? dataTable.GLOBAL.currentPage : Number(dataTable.GLOBAL.currentPage) + 1;
            dataTable.GLOBAL.currentPage = nextPage;
            dataTable.renderTable();
        })
        $(dataTable.SELECTORS.prev_button).on("click", function () {
            let nextPage = dataTable.GLOBAL.currentPage <= 0 ? 0 : Number(dataTable.GLOBAL.currentPage) - 1;
            dataTable.GLOBAL.currentPage = nextPage;
            dataTable.renderTable();
        })
        $(dataTable.SELECTORS.page_button).on("click", function() {
            let nextPage = Number($(this).attr("index")) + 1;
            dataTable.GLOBAL.currentPage = nextPage;
            dataTable.renderTable();
        })
    },

    selectEvent: function() {
        $(dataTable.SELECTORS.select_entries).change(function() {
            dataTable.GLOBAL.itemPerPage = $(dataTable.SELECTORS.select_entries).find(":selected").val();
            dataTable.renderTable();
            dataTable.renderPageButton();
            dataTable.pageChangeEvent();
        })
    },

    sortData: function() {
        let property = dataTable.GLOBAL.currentSortProperty
        dataTable.GLOBAL.listData.sort(function(a,b) {
            const objectPropertyA = property == 0 ? a.rendering_engine.toUpperCase() 
                                : property == 1 ? a.browser.toUpperCase()
                                : property == 2 ? a.platform.toUpperCase()
                                : property == 3 ? a.engine_version 
                                : a.css_grade.toUpperCase();
            const objectPropertyB = property == 0 ? b.rendering_engine.toUpperCase() 
                                : property == 1 ? b.browser.toUpperCase()
                                : property == 2 ? b.platform.toUpperCase()
                                : property == 3 ? b.engine_version 
                                : b.css_grade.toUpperCase();
            if (isNaN(Number(objectPropertyA))==false && isNaN(Number(objectPropertyB))==false) {
                if (objectPropertyA === objectPropertyB) return 0;
                else return (Number(objectPropertyA) < Number(objectPropertyB)) ? -1 : 1;
            }
            else {
                if (objectPropertyA === objectPropertyB) return 0;
                else return (objectPropertyA < objectPropertyB) ? -1 : 1;
            }
        })
    },

    propertyChange: function() {
        $(dataTable.SELECTORS.icon_container).on("click", function() {
            if(dataTable.GLOBAL.currentSortProperty == $(this).attr("index")) {
                dataTable.GLOBAL.listData.reverse();
                $(dataTable.SELECTORS.icon + `[index =${dataTable.GLOBAL.iconActive}]`).removeClass("active");
                dataTable.GLOBAL.iconActive = dataTable.GLOBAL.iconActive == (dataTable.GLOBAL.currentSortProperty * 3 + 2) ? (dataTable.GLOBAL.currentSortProperty * 3 + 1) : (dataTable.GLOBAL.currentSortProperty * 3 + 2);
                $(dataTable.SELECTORS.icon + `[index =${dataTable.GLOBAL.iconActive}]`).addClass("active");
            }
            if(dataTable.GLOBAL.currentSortProperty != $(this).attr("index")) {
                dataTable.GLOBAL.currentSortProperty = $(this).attr("index")
                dataTable.sortData();
                $(dataTable.SELECTORS.icon + `[index =${dataTable.GLOBAL.iconActive}]`).removeClass("active");
                $(dataTable.SELECTORS.icon + `[index = 0]`).addClass("active");
                dataTable.GLOBAL.iconActive = (dataTable.GLOBAL.currentSortProperty * 3 + 2);
                $(dataTable.SELECTORS.icon + `[index =${dataTable.GLOBAL.currentSortProperty * 3}]`).removeClass("active");
                $(dataTable.SELECTORS.icon + `[index =${dataTable.GLOBAL.iconActive}]`).addClass("active");
            }
            dataTable.renderTable();
        })
        
    },

    search: function() {
        $(dataTable.SELECTORS.input_text).keyup(function() {
            let lengthArray = dataTable.GLOBAL.listData.length;
            let text = $(dataTable.SELECTORS.input_text).val();
            for(let i = 0; i < lengthArray; i++) {
                if(dataTable.GLOBAL.listData[i].rendering_engine.toLowerCase().search(text) == -1 
                    && dataTable.GLOBAL.listData[i].browser.toLowerCase().search(text) == -1
                    && dataTable.GLOBAL.listData[i].css_grade.toLowerCase().search(text) == -1 
                    && dataTable.GLOBAL.listData[i].platform.toLowerCase().search(text) == -1 
                    && dataTable.GLOBAL.listData[i].engine_version.toLowerCase().search(text) == -1) {
                   dataTable.GLOBAL.listData.splice(i,1);
                }
            }
            dataTable.renderTable();
        })
    }


};
$(document).ready(function () {
    dataTable.init();
    console.log($(".search-data input").val());
});

// export default dataTable;