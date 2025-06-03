let staffListGlobal = [];

function getAllStaff() {
    $.ajax({
        url: "/api/staff/list",
        type: "GET",
        dataType: "json",
        success: function (staffList) {
            // Lưu lại danh sách để dùng cho filter
            staffListGlobal = staffList.filter(staff => staff.role !== "ROLE_ADMIN");

            renderStaffTable(staffListGlobal);
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function renderStaffTable(staffList) {
    const staffTable = $("#staff-table");
    staffTable.empty();

    staffList.forEach(staff => {
        staffTable.append(`
            <tr>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.rank}</td>
                <td>${staff.salary}</td>
                <td>
                    <a class="edit" href="/admin/staff/edit/${staff.id}" data-toggle="tooltip" title="Edit">
                        <i class="material-icons">&#xE254;</i>
                    </a>
                    <a class="delete" onclick="deleteStaffById(${staff.id})" data-toggle="tooltip" title="Delete">
                        <i class="material-icons">&#xE872;</i>
                    </a>
                </td>
            </tr>
        `);
    });
}

function deleteStaffById(staffId) {
    if (confirm("Bạn có chắc chắn muốn xoá nhân viên này?")) {
        window.location.href = "/admin/staff/delete/" + staffId;
    }
}

// 🔍 Lọc theo tên ngay khi gõ
$(document).ready(function () {
    getAllStaff();

    $("#searchInput").on("keyup", function () {
        const keyword = $(this).val().toLowerCase().trim();
        const filtered = staffListGlobal.filter(staff => staff.name.toLowerCase().includes(keyword));
        renderStaffTable(filtered);
    });
});
