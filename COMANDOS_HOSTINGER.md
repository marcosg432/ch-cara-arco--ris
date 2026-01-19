# 🚀 Comandos para Executar na Hostinger

## ⚠️ ATENÇÃO: Portas em Uso
**NÃO USE:** 3007, 3006, 3000, 3004, 3003, 3002, 3001
**PROJETO CONFIGURADO PARA:** Porta 3005

---

## 📋 Sequência Completa de Comandos

Copie e cole os comandos abaixo no terminal da Hostinger, na ordem apresentada:

### 1. Conectar ao servidor (se ainda não estiver conectado)
```bash
ssh seu-usuario@seu-ip-hostinger
```

### 2. Navegar para o diretório do projeto (ou criar se não existir)
```bash
cd ~
mkdir -p chacara-arco-iris
cd chacara-arco-iris
```

### 3. Clonar o repositório (se ainda não clonou)
```bash
git clone https://github.com/marcosg432/ch-cara-arco--ris.git .
```

### 4. Verificar Node.js (deve ser versão 18 ou superior)
```bash
node --version
```

**Se não tiver Node.js ou for versão antiga, instale:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

### 5. Verificar PM2
```bash
pm2 --version
```

**Se não tiver PM2, instale:**
```bash
sudo npm install -g pm2
pm2 --version
```

### 6. Instalar dependências do projeto
```bash
npm install
```

### 7. Fazer build do projeto
```bash
npm run build
```

### 8. Criar diretório de logs
```bash
mkdir -p logs
```

### 9. Parar instância anterior (se existir)
```bash
pm2 delete brisa-azul 2>/dev/null || true
```

### 10. Iniciar aplicação com PM2
```bash
pm2 start ecosystem.config.cjs
```

### 11. Configurar PM2 para iniciar automaticamente
```bash
pm2 startup
```

**IMPORTANTE:** Copie e execute o comando que aparecer (geralmente algo como):
```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u seu-usuario --hp /home/seu-usuario
```

### 12. Salvar configuração do PM2
```bash
pm2 save
```

### 13. Verificar status
```bash
pm2 status
```

### 14. Ver logs (para confirmar que está rodando)
```bash
pm2 logs brisa-azul --lines 20
```

### 15. Liberar porta no firewall (se necessário)
```bash
sudo ufw allow 3005/tcp
sudo ufw reload
```

---

## ✅ Verificação Final

Execute estes comandos para confirmar que tudo está funcionando:

```bash
# Ver status do PM2
pm2 status

# Ver informações da aplicação
pm2 info brisa-azul

# Verificar se a porta está escutando
sudo netstat -tulpn | grep 3005
```

**A aplicação deve estar acessível em:** `http://seu-ip:3005` ou `http://seu-dominio:3005`

---

## 🔄 Comandos para Atualizar o Projeto (Após mudanças no GitHub)

Quando você fizer alterações e atualizar o GitHub, execute estes comandos na Hostinger:

```bash
cd ~/chacara-arco-iris
pm2 stop brisa-azul
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
pm2 logs brisa-azul --lines 20
```

---

## 🛠️ Comandos de Manutenção

### Ver logs em tempo real
```bash
pm2 logs brisa-azul
```

### Reiniciar aplicação
```bash
pm2 restart brisa-azul
```

### Parar aplicação
```bash
pm2 stop brisa-azul
```

### Iniciar aplicação
```bash
pm2 start brisa-azul
```

### Ver uso de recursos
```bash
pm2 monit
```

### Deletar aplicação do PM2
```bash
pm2 delete brisa-azul
```

---

## 🚨 Se Algo Der Errado

### Aplicação não inicia
```bash
pm2 logs brisa-azul --err
```

### Porta 3005 já está em uso
```bash
sudo lsof -i :3005
sudo kill -9 <PID_DO_PROCESSO>
pm2 restart brisa-azul
```

### Reconfigurar startup automático
```bash
pm2 unstartup
pm2 startup
# Execute o comando que aparecer
pm2 save
```

---

**✅ Todos os arquivos de configuração já estão prontos no repositório!**
**✅ Porta configurada: 3005 (não interfere nas outras portas em uso)**

