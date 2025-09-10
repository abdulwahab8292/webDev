interface Config {
    readonly endpoint : string,
    readonly apiKey : string,
}

const config : Config = {
    endpoint: 'https://api.example.com',
    apiKey: 'YOUR_API_KEY',
}
//readonly allows only initiallizzation and doesnt allow further changes or updates

interface Config2 {
    endpoint : string,
    apiKey : string,

}
const config2 : Readonly<Config2> = {
    endpoint: 'https://api.example.com',
    apiKey: 'YOUR_API_KEY',
}