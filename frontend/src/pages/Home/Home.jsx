import ListGroup from 'react-bootstrap/ListGroup'


export default function Home() {
    return (
        <div className="Home">
            <h2 className="text-center">
                22. Предсказание стоимости акций на основе финансовых новостей
            </h2>

            <br />

            <ListGroup horizontal>
                <ListGroup.Item>Елизавета Мирова @elithie</ListGroup.Item>
                <ListGroup.Item>Рощин Филипп @qwerty111ytrewq</ListGroup.Item>
                <ListGroup.Item>Алан Насибуллин @Alan_Nasibullin</ListGroup.Item>
                <ListGroup.Item>Евгений Поликанин @Nmmage</ListGroup.Item>
            </ListGroup>

            <br />

            <h5 className="text-center">Куратор: Дмитрий Качкин</h5>
        </div>
    )
}
