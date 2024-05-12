from flask import Flask, request, jsonify, render_template, redirect
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

# Criar login (Cadastrar) e verificar se usuario ja existe 
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
    
# Verificaçao do login
@app.route('/verificar_login/', methods=['POST'])
def verificar_login():
    # Verifique se os dados foram enviados no formato JSON
    if request.is_json:
        # Obtenha os dados do JSON
        dados = request.get_json()

        # Extraia o nome de usuário e senha dos dados JSON
        usuario = dados.get('usuario')
        senha = dados.get('senha')

        # Verifique se o usuário existe no banco de dados e se a senha está correta
        cursor.execute("SELECT * FROM login_cinema WHERE usuario = %s AND senha = %s", (usuario, senha))
        user = cursor.fetchone()

        if user:
            # Usuário autenticado, redirecione para a página principal
            return jsonify({'success': True}), 200
        else:
            # Usuário não encontrado ou senha incorreta, retorne uma mensagem de erro
            return jsonify({'error': 'Nome de usuário ou senha incorretos'}), 401
    else:
        # Se os dados não estiverem no formato JSON, retorne um erro
        return jsonify({'error': 'A requisição deve ser enviada no formato JSON'}), 400
    
    
# Endpoint para confirmar a seleção dos assentos
@app.route('/confirmar_assentos/', methods=['POST'])
def confirmar_assentos():
    if request.is_json:
        dados = request.get_json()
        
        if 'assentos' not in dados:
            return jsonify({'mensagem': 'A lista de assentos é obrigatória'}), 400
        
        assentos = dados['assentos']
        
        try:
            for assento in assentos:
                # Atualiza a situação do assento no banco de dados para ocupado (1)
                cursor.execute("UPDATE sala_cinema SET situacao_sala = 1 WHERE id = %s", (assento,))
                conexao.commit()
            
            return jsonify({'mensagem': 'Assentos confirmados com sucesso'}), 200
        except Exception as e:
            # Em caso de erro, desfaz quaisquer alterações no banco de dados e retorna uma mensagem de erro
            conexao.rollback()
            return jsonify({'error': f'Erro ao confirmar assentos: {str(e)}'}), 500
    else:
        return jsonify({'error': 'A requisição deve ser enviada no formato JSON'}), 400


# ENDPOINTS PARA A SALA DO CINEMA
# Consultar todos os assentos no banco
@app.route('/consultar_sala/', methods=['GET'])
def consultar_sala():
    consulta = "SELECT * FROM sala_cinema"
    cursor.execute(consulta)
    resultados = cursor.fetchall()
    
    if resultados: 
        sala = [{'id': id, 'situacao_sala': situacao_sala, 'cadeira': cadeira} for id, situacao_sala, cadeira, _ in resultados]
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


@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/catalogo')
def catalogo():
    return render_template('catalogo.html')

@app.route('/quemsomos')
def quemsomos():
    return render_template('quemsomos.html')

@app.route('/politica_priv')
def politica_priv():
    return render_template('politica_priv.html')

@app.route('/termo_uso')
def termo_uso():
    return render_template('termo_uso.html')

@app.route('/cadeadora') # filmes/cadeadora.html
def cadeadora():
    return render_template('filmes/cadeadora.html')

@app.route('/cinemavip')
def cinemavip():
    return render_template('cinemavip.html')

@app.route('/salaDora')
def salaDora():
    return render_template('salas cinema/sala-dora.html')

if __name__ == '__main__':
    app.run(debug=True)

# Fechar conexão após o uso
cursor.close()
conexao.close()