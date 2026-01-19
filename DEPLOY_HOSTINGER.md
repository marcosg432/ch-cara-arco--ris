# Guia de Deploy na Hostinger com PM2

## ⚠️ IMPORTANTE: Portas em Uso
**NÃO USE AS SEGUINTES PORTAS (já estão em uso):**
- 3007, 3006, 3000, 3004, 3003, 3002, 3001

**Este projeto está configurado para usar a porta: 3005**

---

## Passo 1: Conectar ao servidor via SSH
```bash
ssh seu-usuario@seu-ip-hostinger
```

## Passo 2: Navegar para o diretório do projeto
```bash
# Se o projeto já existe, navegue até ele
cd ~/chacara-arco-iris
# ou
cd /home/seu-usuario/chacara-arco-iris
```

**OU criar nova pasta:**
```bash
cd ~
mkdir chacara-arco-iris
cd chacara-arco-iris
```

## Passo 3: Clonar o repositório (se ainda não clonou)
```bash
git clone https://github.com/marcosg432/ch-cara-arco--ris.git .
```

## Passo 4: Verificar/Instalar Node.js e PM2
```bash
# Verificar se Node.js está instalado
node --version

# Se não estiver, instalar Node.js (versão 18 ou superior)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar se PM2 está instalado
pm2 --version

# Se não estiver, instalar PM2 globalmente
sudo npm install -g pm2
```

## Passo 5: Instalar dependências do projeto
```bash
npm install
```

## Passo 6: Fazer build do projeto
```bash
npm run build
```

## Passo 7: Criar diretório de logs
```bash
mkdir -p logs
```

## Passo 8: Parar instância anterior (se existir)
```bash
pm2 delete brisa-azul 2>/dev/null || true
```

## Passo 9: Iniciar aplicação com PM2
```bash
pm2 start ecosystem.config.cjs
```

## Passo 10: Configurar PM2 para iniciar automaticamente no boot
```bash
pm2 startup
# Execute o comando que aparecer (geralmente algo como: sudo env PATH=...)
pm2 save
```

## Passo 11: Verificar status
```bash
pm2 status
pm2 logs brisa-azul
```

---

## 📋 Comandos Úteis do PM2

```bash
# Ver logs em tempo real
pm2 logs brisa-azul

# Ver apenas últimas linhas
pm2 logs brisa-azul --lines 50

# Reiniciar aplicação
pm2 restart brisa-azul

# Parar aplicação
pm2 stop brisa-azul

# Iniciar aplicação
pm2 start brisa-azul

# Deletar aplicação do PM2
pm2 delete brisa-azul

# Ver informações detalhadas
pm2 info brisa-azul

# Monitorar recursos (CPU, memória)
pm2 monit

# Ver todas as aplicações
pm2 list

# Salvar configuração atual
pm2 save
```

---

## 🔄 Atualizar o Projeto (Após mudanças no GitHub)

```bash
# Parar a aplicação
pm2 stop brisa-azul

# Atualizar código do GitHub
git pull origin main

# Instalar novas dependências (se houver)
npm install

# Fazer novo build
npm run build

# Reiniciar aplicação
pm2 restart brisa-azul

# Verificar logs
pm2 logs brisa-azul
```

---

## 🔥 Configuração de Firewall (se necessário)

```bash
# Permitir porta 3005
sudo ufw allow 3005/tcp
sudo ufw reload

# Verificar status do firewall
sudo ufw status
```

---

## 🌐 Acesso à Aplicação

A aplicação estará disponível em:
- `http://seu-ip:3005`
- `http://seu-dominio:3005`

**Nota:** Para usar na porta 80 (HTTP padrão), você precisará configurar um proxy reverso com Nginx.

---

## 🚨 Troubleshooting

### Aplicação não inicia
```bash
# Verificar logs de erro
pm2 logs brisa-azul --err

# Verificar se a porta está em uso
sudo netstat -tulpn | grep 3005

# Verificar se o build foi feito corretamente
ls -la dist/
```

### Porta já em uso
```bash
# Verificar qual processo está usando a porta
sudo lsof -i :3005

# Se necessário, matar o processo
sudo kill -9 <PID>
```

### PM2 não inicia automaticamente
```bash
# Reconfigurar startup
pm2 unstartup
pm2 startup
# Execute o comando que aparecer
pm2 save
```

---

## 📝 Checklist de Deploy

- [ ] Node.js instalado (versão 18+)
- [ ] PM2 instalado globalmente
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Build realizado (`npm run build`)
- [ ] Diretório `logs/` criado
- [ ] PM2 iniciado (`pm2 start ecosystem.config.cjs`)
- [ ] PM2 configurado para startup automático
- [ ] Porta 3005 liberada no firewall
- [ ] Aplicação acessível via navegador

---

**Desenvolvido para Chácara Arco-Íris - Porta 3005**
