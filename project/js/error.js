Vue.component('comp-error', {
    props: ['error'],
    template: `
            <h3 v-show='error'>Не удается выполнить запрос к серверу</h3>
            `
})



