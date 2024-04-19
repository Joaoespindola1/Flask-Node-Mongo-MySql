from flask import Flask, render_template, request, jsonify
import mysql.connector
import requests


mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='12345678',
    database='aula_13_10'
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

    return jsonify(response.json())


@app.route('/aluno')
def funcionario():
    return render_template('aluno.html')


@app.route('/aluno/cadastro', methods=['POST'])
def add_funcionario():
    primeiro_nome = request.form['primeiro_nome']
    sobrenome = request.form['sobrenome']
    curso = request.form['curso']
    data_matricula = request.form['data_matricula']
    tel = request.form['tel']
    cursor.execute(f"INSERT INTO alunos (primeiro_nome, sobrenome, curso, data_matricula, tel) VALUES ('{primeiro_nome}', '{sobrenome}', '{curso}', '{data_matricula}', {tel})")
    mydb.commit()
    return '<h1>Adicionado com Sucesso</h1>'

@app.route('/aluno/list', methods=['POST'])
def read_funcionario():
    cursor.execute('SELECT * FROM alunos')
    funcionarios = cursor.fetchall()
    return f'<h1>Alunos: {funcionarios} </h1>'


if __name__ == '__main__':
    cursor = mydb.cursor()
    app.run(debug=True)
