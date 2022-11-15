import arrData from "./data.js";
var dataTable = {
    GLOBAL: {
        listData: arrData,
        set: 0,
        currentPage: 1,
        allPage: 0,
        itemPerPage: 10,
    },
  
    CONSTS: {},
  
    SELECTORS: {
        table: ".data-table-container table tbody",
        table_item: "tr td",
        paginate_button: ".paginate-button",
        prev_button: ".paginate-button .prev-button",
        next_button: ".paginate-button .next-button",
        page_button: ".paginate-button .page-button",
        select_entries: "elect"
    },

    init: function () {
        dataTable.renderTable();
        dataTable.renderPageButton();
        dataTable.pageChangeEvent();
        dataTable.selectEvent();
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
        dataTable.GLOBAL.allPage = Math.round(dataTable.GLOBAL.allPage);
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
        })
    }


};
$(document).ready(function () {
    dataTable.init();
});

// export default dataTable;