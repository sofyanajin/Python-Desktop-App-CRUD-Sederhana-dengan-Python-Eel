import sqlite3


def showallrecords():
    try:
        connect = sqlite3.connect("views/database/storage.db")
        cursor = connect.cursor()
        cursor.execute("SELECT * FROM keluarga")
        registers = []
        for item in cursor.fetchall():
            # test = item[1]
            # print(test)
            registers.append(item)
        return registers

    except Exception as error:
        print(error)
        msg = "Error"
        return msg


def save_keluargabaru(Nama, Jenis_Kelamin, ID_Ortu):
    try:
        connect = sqlite3.connect("views/database/storage.db")
        cursor = connect.cursor()

        if Nama != "" and Jenis_Kelamin != "" and ID_Ortu != "":
            cursor.execute(
                "INSERT INTO keluarga(Nama, Jenis_Kelamin, ID_Ortu) VALUES(?,?,?)", (Nama, Jenis_Kelamin, ID_Ortu))
            connect.commit()
            connect.close()
            msg = "Sukses"
            return msg
        else:
            msg = "Gagal"
            return msg

    except Exception as Error:
        print(Error)
        msg = "failure"
        return msg


def show_selectedkeluarga(id):
    try:
        connect = sqlite3.connect("views/database/storage.db")
        cursor = connect.cursor()
        cursor.execute("SELECT * FROM keluarga WHERE id =?", (id,))
        editkeluarga = []
        for item in cursor.fetchone():
            editkeluarga.append(item)
        return editkeluarga

    except Exception as error:
        print(error)
        msg = "Error"
        return msg


def update_keluargabaru(Nama, Jenis_Kelamin, ID_Ortu, id):
    try:
        connect = sqlite3.connect("views/database/storage.db")
        cursor = connect.cursor()

        if Nama != "" and Jenis_Kelamin != "" and ID_Ortu != "":
            cursor.execute("UPDATE keluarga SET Nama =?, Jenis_Kelamin =?, ID_Ortu =? WHERE id =?",
                           (Nama, Jenis_Kelamin, ID_Ortu, id,))
            connect.commit()
            connect.close()
            msg = "Sukses"
            return msg
        else:
            msg = "Gagal"
            return msg
    except Exception as Error:
        print(Error)
        msg = "Gagal"
        return msg


def show_deletekeluarga(id):
    try:
        connect = sqlite3.connect("views/database/storage.db")
        cursor = connect.cursor()
        cursor.execute("DELETE FROM keluarga WHERE id =?", (id,))
        connect.commit()
        connect.close()
        msg = "Sukses"
        return msg

    except Exception as error:
        print(error)
        msg = "Error"
        return msg
