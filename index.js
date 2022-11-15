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
        table: ".data-table-container table",
        table_item: "tr td",
        paginate_button: ".paginate-button",
        prev_button: ".paginate-button .prev-button",
        next_button: ".paginate-button .next-button",
        page_button: ".paginate-button .page-button"
    },

    init: function () {
        dataTable.renderTable(1);
        dataTable.renderPageButton(10);
        // dataTable.pageChangeEvent();
    },

    renderTable: function(numPage) {
        let html = "";
        let index = (numPage-1) * 10;
        let maxIndex = Number(index) + 10
        while(index < maxIndex) {
            html += `<tr>
                <td>${dataTable.GLOBAL.listData[index].rendering_engine}</td>
                <td>${dataTable.GLOBAL.listData[index].browser}</td>
                <td>${dataTable.GLOBAL.listData[index].platform}</td>
                <td>${dataTable.GLOBAL.listData[index].engine_version}</td>
                <td>${dataTable.GLOBAL.listData[index].css_grade}</td>
            </tr>`
            index ++;
        }
        $(dataTable.SELECTORS.table).append(html);
    },

    renderPageButton: function(itemPerPage) {
        let allPage = dataTable.GLOBAL.listData.length / itemPerPage;
        allPage = Math.floor(allPage) + 1
        let html = "";
        html += ` <li>
                    <a class ="pre-button"href="">Previous</a>
                </li>`;
        for(let i = 0; i < allPage; i++) {
            html += `<li>
                        <a class="page-button" href="" index="${i}">${i+1}</a>
                    </li>`
        }
        html += `<li>
                    <a class ="next-button"href="">Next</a>
                </li>`
        $(dataTable.SELECTORS.paginate_button).html(html);
    },

    // pageChangeEvent: function() {
    //     $(dataTable.SELECTORS.next_button).on("click", function () {
    //         let nextPage = dataTable.GLOBAL.currentPage >= dataTable.GLOBAL.allPage ? dataTable.GLOBAL.currentPage : Number(dataTable.GLOBAL.currentPage) + 1;
    //         dataTable.GLOBAL.currentPage = nextPage;
    //         dataTable.renderTable(dataTable.GLOBAL.currentPage);
    //     })
    //     // $(dataTable.SELECTORS.prev_button).on("click", function () {
    //     //     nextPage = dataTable.GLOBAL.currentPage <= 1 ? currentPage : Number(dataTable.GLOBAL.currentPage) - 1;
    //     // })
    //     // $(dataTable.SELECTORS.page_button).on("click", function() {
    //     //     nextPage = $(this).attr("index") + 1;
    //     // })
        
    // }


};
$(document).ready(function () {
    dataTable.init();
});

// export default dataTable;