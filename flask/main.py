from flask import Flask, render_template, request, jsonify
import mysql.connector
import requests


mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='2114',
    database='trab'
)

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def logar():
    url = 'http://localhost:3000/login'

    usuario = request.form['usuario']
    senha = request.form['senha']

    data = {'user' : usuario,
            'password': senha}
    
    response = requests.post(url, json=data)
    response_json = response.json()
    mensagem = response_json.get('mensagem', 'Mensagem não encontrada')

    return render_template('mensagem.html', mensagem=mensagem)


@app.route('/aluno')
def funcionario():
    return render_template('aluno.html')

@app.route('/cadastro')
def cadastro():
    return render_template('cadastrar.html')

@app.route('/cadastro', methods=['POST'])
def add_funcionario():
    primeiro_nome = request.form['primeiro_nome']
    sobrenome = request.form['sobrenome']
    curso = request.form['curso']
    tel = request.form['tel']
    cursor.execute(f"INSERT INTO alunos (primeiro_nome, sobrenome, curso, tel) VALUES ('{primeiro_nome}', '{sobrenome}', '{curso}', {tel})")
    mydb.commit()
    mensagem = 'ALUNO CADASTRADO COM SUCESSO'
    return render_template('mensagem.html', mensagem=mensagem)

@app.route('/verAlunos')
def read_funcionario():
    cursor.execute('SELECT * FROM alunos')
    alunos = cursor.fetchall()
    return render_template('verAlunos.html', alunos=alunos)

@app.route('/atualizar')
def atualizar():
    return render_template('atualizar.html')

@app.route('/atualizar', methods=['POST'])
def editar_aluno():
    matricula = request.form['matricula']
    primeiro_nome = request.form['primeiro_nome']
    sobrenome = request.form['sobrenome']
    curso = request.form['curso']
    tel = request.form['tel']
    cursor.execute(f"UPDATE alunos SET primeiro_nome='{primeiro_nome}', sobrenome='{sobrenome}', curso='{curso}', tel={tel} WHERE matricula={matricula}")
    mydb.commit()
    mensagem = 'ALUNO ATUALIZADO COM SUCESSO'
    return render_template('mensagem.html', mensagem=mensagem)

@app.route('/deletar')
def deletar():
    return render_template('deletar.html')

@app.route('/deletar', methods=['POST'])
def deletar_aluno():
    matricula = request.form['matricula']
    cursor.execute(f"DELETE FROM alunos WHERE matricula={matricula}")
    mydb.commit()
    mensagem = 'ALUNO DELETADO COM SUCESSO'
    return render_template('mensagem.html', mensagem=mensagem)
  


if __name__ == '__main__':
    cursor = mydb.cursor()
    app.run(debug=True)
