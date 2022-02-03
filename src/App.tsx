import './styles.css'
import { ClickCounter } from './ClickCounter'

export const App = () => {
    const num = "asdasd"
    return <>
    <h1>Hello world! {process.env.name} {process.env.NODE_ENV}</h1>
    <ClickCounter/>
    </>
}