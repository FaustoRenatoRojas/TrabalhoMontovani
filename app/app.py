from flask import Flask, jsonify, request
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
    app.run(port=5001, host='localhost', debug=True)

# Fechar conexão após o uso
cursor.close()
conexao.close()