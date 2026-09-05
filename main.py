import sys
from PySide6.QtWidgets import QApplication,QMainWindow,QWidget,QHBoxLayout,QVBoxLayout,QPushButton,QLabel,QStackedWidget
from core.database import init_db,connect
from core.theme import LIGHT,DARK
from modules.simple_page import SimplePage

class App(QMainWindow):
    def __init__(self):
        super().__init__(); self.dark=False
        self.setWindowTitle('🚀 ARMAND APP PRO'); self.resize(1050,700)
        self.pages=QStackedWidget(); side=QWidget(); side.setFixedWidth(210); sl=QVBoxLayout(side)
        logo=QLabel('🚀 ARMAND APP PRO'); logo.setStyleSheet('font-size:20px;font-weight:700'); sl.addWidget(logo)
        self.dashboard=QWidget(); dl=QVBoxLayout(self.dashboard); dl.addWidget(QLabel('🏠 Tableau de bord'))
        dl.addWidget(QLabel('Bienvenue dans ton application personnelle 👋')); dl.addStretch()
        self.pages.addWidget(self.dashboard)
        self.pages.addWidget(SimplePage(connect,'📝 Notes','notes',['title']))
        self.pages.addWidget(SimplePage(connect,'✅ Tâches','tasks',['title']))
        self.pages.addWidget(SimplePage(connect,'📅 Agenda','events',['title','date']))
        for text,i in [('🏠 Accueil',0),('📝 Notes',1),('✅ Tâches',2),('📅 Agenda',3)]:
            b=QPushButton(text); b.clicked.connect(lambda _,x=i:self.pages.setCurrentIndex(x)); sl.addWidget(b)
        sl.addStretch()
        dark=QPushButton('🌙 Mode sombre'); dark.clicked.connect(self.toggle); sl.addWidget(dark)
        quitb=QPushButton('❌ Quitter'); quitb.clicked.connect(self.close); sl.addWidget(quitb)
        root=QWidget(); l=QHBoxLayout(root); l.addWidget(side); l.addWidget(self.pages); self.setCentralWidget(root); self.apply()
    def toggle(self): self.dark=not self.dark; self.apply()
    def apply(self): self.setStyleSheet(DARK if self.dark else LIGHT)

if __name__=='__main__':
    init_db(); app=QApplication(sys.argv); w=App(); w.show(); sys.exit(app.exec())
