$(document).ready(function () {
    eel.fetchalldata()

    $("#btn_addnew").on("click", function () {
        $("#Addnewmodal").show();
    });
    $(".close").on("click", function () {
        $("#Addnewmodal").hide();
    });

    $(".closeedit").on("click", function () {
        $("#Edit_modal").hide();
    });
    $(".closedelete").on("click", function () {
        $("#Delete_modal").hide();
    });
})

function link(target) {
    window.location.href = target;
}

eel.expose(action_out)
function action_out(registers) {
    registers.forEach(showdata)
}

eel.expose(action_edit)
function action_edit(editkeluarga) {
    editkeluarga.forEach(get_array_values)
}

function get_array_values(item, index) {
    if (index == 0) {
        document.getElementById("id").value = item;
    } else if (index == 1) {
        document.getElementById("edit_nama").value = item;
    } else if (index == 2) {
        document.getElementById("edit_jeniskelamin").value = item;
    } else if (index == 3) {
        document.getElementById("edit_idortu").value = item;
    }
    else { }
}

async function save_edit() {
    $("#myformedit").validate({
        messages: {
            edit_nama: {
                required: "Masukkan Nama"
            },
            edit_jeniskelamin: {
                required: "Masukkan Jenis Kelamin"
            },
            edit_idortu: {
                required: "Masukkan ID Orang Tua"
            },
        },
        submitHandler: function (form) {
            //alert("Sukses")
            eel.btn_update($('#edit_nama').val(), $('#edit_jeniskelamin').val(), $('#edit_idortu').val(), $('#id').val())
        }
    });
}

function showdata(item, index) {
    var get_table = document.getElementById("keluarga");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    var id = item[0]
    td.innerText = item[0]
    td2.innerText = item[1]
    td3.innerText = item[2]
    td4.innerText = item[3]

    td5.innerHTML = '<button type="button" class="btn" onclick="btn_edit(' + id + ')">Ubah</button> | <button type="button" class="btndelete" onclick="buttondelete((' + id + '))">Hapus</button>'

    get_table.appendChild(tr)
    tr.appendChild(td)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)

}

//Keluarga Baru
async function save_register_js() {
    $("#myform").validate({
        messages: {
            txtfullname: {
                required: "Masukkan Nama"
            },
            txtjeniskelamin: {
                required: "Masukkan Jenis Kelamin"
            },
            txtidortu: {
                required: "Masukkan ID Orang Tua"
            },
        },
        submitHandler: function (form) {
            //alert("sukses");
            eel.btn_save($('#txtfullname').val(), $('#txtjeniskelamin').val(), $('#txtidortu').val())
        }
    });
};

eel.expose(save_return);
function save_return(status) {
    if (status == "Sukses") {
        $('#return_register').text('Data Keluarga Berhasil Ditambahkan!');
        $('#txtfullname').val('');
        $('#txtjeniskelamin').val('');
        $('#txtidortu').val('');
    }
    if (status == "Gagal") {
        $('#return_register').text('Gagal Menambahkan. Pastikan semua data sudah terisi.');
    }
};

function buttondelete(id) {
    document.getElementById("idvalue").value = id;
    $("#Delete_modal").show();
}

async function btn_edit(id) {
    eel.get_keluarga(id)
    $("#Edit_modal").show();
}

async function btn_submitdelete(id) {
    //alert(id);
    eel.get_delete_keluarga(id)
}

eel.expose(update_return);
function update_return(status) {
    if (status == "Sukses") {
        $('#return_update').text('Data Keluarga Berhasil Diperbaharui.');
        $('#txtfullname').val('');
        $('#txtjeniskelamin').val('');
        $('#txtidortu').val('');
    }
    if (status == "Gagal") {
        $('#return_update').text('Error ketika menambahkan. Pastikan data telah terisi.');
    }
};

eel.expose(delete_return)
function delete_return(status) {
    alert(status);
    if (status == "Sukses") {
        location.href = "index.html";
    }
    if (status == "Gagal") {
        $('#return_delete').text('Gagal menghapus data.');
    }
}