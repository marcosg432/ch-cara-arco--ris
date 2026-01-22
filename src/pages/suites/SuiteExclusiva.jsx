import SuiteBase from './SuiteBase'

const SuiteExclusiva = () => {
  const suiteData = {
    id: 'exclusiva',
    nome: 'Chále 07',
    preco: 300,
    descricao: 'Combina elegância, conforto e privacidade em um só espaço. Ideal para quem busca uma estadia diferenciada, com mais tranquilidade e uma experiência única na Chácara Arco Íris.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuiteExclusiva




