import './styles.css'
import { ClickCounter } from './ClickCounter'

export const App = () => {
    return <>
    <h1>Hello world! {process.env.name} {process.env.NODE_ENV}</h1>
    <ClickCounter/>
    </>
}