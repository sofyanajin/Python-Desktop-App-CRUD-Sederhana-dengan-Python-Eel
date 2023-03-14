import eel
import pyautogui  # https://pypi.org/project/PyAutoGUI/
from views.models.keluarga import showallrecords, save_keluargabaru, show_selectedkeluarga, update_keluargabaru, show_deletekeluarga

eel.init('views')


@eel.expose
def fetchalldata():
    select_reg = showallrecords()
    eel.action_out(select_reg)


@eel.expose
def btn_save(Nama, Jenis_Kelamin, ID_Ortu):
    msg = save_keluargabaru(Nama, Jenis_Kelamin, ID_Ortu)
    eel.save_return(str(msg))


@eel.expose
def get_keluarga(id):
    select_keluarga = show_selectedkeluarga(id)
    eel.action_edit(select_keluarga)


@eel.expose
def btn_update(Nama, Jenis_Kelamin, ID_Ortu, id):
    msg = update_keluargabaru(Nama, Jenis_Kelamin, ID_Ortu, id)
    eel.update_return(str(msg))


@eel.expose
def get_delete_keluarga(id):
    select_del_keluarga = show_deletekeluarga(id)
    eel.delete_return(select_del_keluarga)


eel.start(
    'templates/index.html',
    size=pyautogui.size()
)
