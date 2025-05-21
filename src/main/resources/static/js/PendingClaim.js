function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
let claimData = [];
let userName = getCookie("userName");
let infoStaff = document.getElementById("infoStaff");
infoStaff.textContent = userName;

function getStaffByEmail() {
    $.ajax({
        url: "/api/staffByEmail/" + userName,
        type: "GET",
        dataType: "json",
        success: function(response) {
            GetInfoStaffPending(response.id);
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetInfoStaffPending(e) {
    $.ajax({
        url: "/api/staff/" + e,
        type: "GET",
        dataType: "json",
        success: function(response) {
            let claimTable = $("#claimTable");
            claimTable.empty();
            response.workingDTOS.forEach(content => {
                if (content.roleStaff === "PM") {
                    GetInfoProject(content.project.id, claimTable, e);
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetInfoProject(projectId, claimTable, e) {
    $.ajax({
        url: "/api/claims/project/" + projectId,
        type: "GET",
        dataType: "json",
        success: function(response) {
            response.forEach(content => {
                if (content.status === "Pending") {
                    GetNameProject(content.projectId, function(nameProject) {
                        GetEmailStaff(content.staffId, function(email) {
                            let claimRow = `
                                <tr>
                                    <td>${email}</td>
                                    <td>${nameProject}</td>
                                    <td>${new Date(content.claimDate).toLocaleDateString("vi-VN")}</td>
                                    <td>${content.remarks}</td>
                                    <td style="color: #ffd536">${content.status}</td>
                                    <td>
                                        <button class="btn btn-primary" onclick="changeLink(${e},${content.id})">
                                            <i class="fa fa-pen"></i> Details</button>
                                    </td>
                                </tr>
                            `;
                            claimData.push(claimRow);
                            renderTablePage(currentPage);
                            renderPagination();
                        });
                    });
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}
const itemsPerPage = 7;
let currentPage = 1;

function renderTablePage(page) {
    let claimTable = $("#claimTable");
    claimTable.empty();
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = claimData.slice(start, end);
    paginatedItems.forEach(row => {
        claimTable.append(row);
    });
}

function renderPagination() {
    let totalPages = Math.ceil(claimData.length / itemsPerPage);
    let pagination = $("#pagination");
    pagination.empty();

    for (let i = 1; i <= totalPages; i++) {
        let pageItem = `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#">${i}</a>
        </li>`;
        pagination.append(pageItem);
    }

    // Gắn sự kiện click cho các nút
    $(".page-item").on("click", function () {
        let selectedPage = parseInt($(this).text());
        currentPage = selectedPage;
        renderTablePage(currentPage);
        renderPagination();
    });
}

function GetNameProject(projectId, callback) {
    $.ajax({
        url: "/api/projects/" + projectId,
        type: "GET",
        dataType: "json",
        success: function(response) {
            callback(response.nameProject);
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetEmailStaff(staffId, callback) {
    $.ajax({
        url: "/api/staff/" + staffId,
        type: "GET",
        dataType: "json",
        success: function(response) {
            callback(response.email);
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function changeLink(staffId, claimId) {
    sessionStorage.setItem("DetailId",claimId);
    window.location.href = "/claim/approve/" + claimId;
}

let linkHome = document.getElementById("link-home");
linkHome.setAttribute("href", "/claim/draft");
$("#searchEmail").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#claimTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
$("#searchDate").on("change", function () {
    let selectedDate = $(this).val(); // định dạng yyyy-mm-dd
    if (!selectedDate) {
        renderTablePage(1); // nếu xoá ngày -> render lại toàn bộ
        return;
    }

    let filteredData = claimData.filter(rowHtml => {
        // Trích xuất ngày từ chuỗi HTML
        let dateMatch = rowHtml.match(/<td>(\d{1,2}\/\d{1,2}\/\d{4})<\/td>/);
        if (dateMatch && dateMatch[1]) {
            let [day, month, year] = dateMatch[1].split('/');
            let formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            return formatted === selectedDate;
        }
        return false;
    });

    // Cập nhật dữ liệu được lọc và vẽ lại bảng + phân trang
    let oldClaimData = claimData; // lưu lại
    claimData = filteredData;
    currentPage = 1;
    renderTablePage(currentPage);
    renderPagination();
    claimData = oldClaimData; // reset lại sau render
});

getStaffByEmail();