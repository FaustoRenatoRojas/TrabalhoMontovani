from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

config = {
    'user': 'root',
    'password': '1234',
    'host': 'localhost',
    'database': 'bd_apipython',
    'raise_on_warnings': True
}

conexao = mysql.connector.connect(**config)
cursor = conexao.cursor()

@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

# Criar login (Cadastrar)
@app.route('/criar_usuario/', methods=['POST'])
def criar_usuario():
    if request.is_json:
        dados = request.get_json()
        
        if 'usuario' not in dados or 'senha' not in dados:
            return jsonify({'mensagem': 'Campos "usuario" e "senha" são obrigatórios'}), 400
        
        usuario = dados['usuario']
        senha = dados['senha']
        
        # Verifica se o usuário já existe
        cursor.execute("SELECT * FROM login_cinema WHERE usuario = %s", (usuario,))
        if cursor.fetchone():
            return jsonify({'mensagem': 'Usuário já existe'}), 400
        
        # Insere novo usuário e senha na tabela login_cinema
        insercao = "INSERT INTO login_cinema (usuario, senha) VALUES (%s, %s)"
        cursor.execute(insercao, (usuario, senha))
        conexao.commit()
        
        return jsonify({'mensagem': 'Usuário criado com sucesso'}), 201
    else:
        return jsonify({'error': 'A requisicao nao e JSON'}), 415

# ENDPOINTS PARA A SALA DO CINEMA
# Consultar todos os assentos no banco
@app.route('/consultar_sala/', methods=['GET'])
def consultar_sala():
    consulta = "SELECT * FROM sala_cinema"
    cursor.execute(consulta)
    resultados = cursor.fetchall()
    
    if resultados: 
        sala = [{'id': id, 'situacao_sala': situacao_sala, 'cadeira': cadeira} for id, situacao_sala, cadeira in resultados]
        return jsonify({'sala': sala})
    else: 
        return jsonify({'mensagem': 'Sala nao encontrada'}), 404

# consultando assento pelo id
@app.route('/consultar_sala/<int:id>/', methods=['GET'])
def consultar_sala_por_id(id):
    consulta = "SELECT * FROM sala_cinema WHERE id = %s"
    cursor.execute(consulta, (id,))
    resultado = cursor.fetchone()
    
    if resultado:
        sala = {
            'id': resultado[0],
            'situacao_sala': resultado[1],
            'cadeira': resultado[2]
        }
        return jsonify({'sala': sala})
    else:
        return jsonify({'mensagem': 'Assento nao encontrada'}), 404
    
# alterar situacao de sala 
@app.route('/atualizar_situacao/<int:id>/', methods=['PUT'])
def atualizar_situacao_assento(id):
    dados = request.get_json()
    
    if 'situacao_sala' not in dados:
        return jsonify({'mensagem': 'Campo "situacao_sala" é obrigatório'}), 400
    
    nova_situacao = dados['situacao_sala']
    
    if nova_situacao not in [0, 1]:
        return jsonify({'mensagem': 'Valor inválido para "situacao_sala". Use 0 para livre ou 1 para ocupado'}), 400
    
    atualizacao = "UPDATE sala_cinema SET situacao_sala = %s WHERE id = %s"
    cursor.execute(atualizacao, (nova_situacao, id))
    conexao.commit()
    
    return jsonify({'mensagem': f'Situação do assento {id} atualizada com sucesso'}), 200

if __name__ == '__main__':
    app.run(debug=True)

# Fechar conexão após o uso
cursor.close()
conexao.close()