Vue.component('subscribe-comp', {
    template: `
    <section class="subscribe">
        <div class="subscribe-wrp center">
            <div class="subscribe-info">
                <div class="subscribe-info-avatar"></div>
                <p class="subscribe-info-txt">&laquo;Vestibulum quis porttitor dui! Quisque viverra
                    &nbsp;mi,
                    <span>a&nbsp;pulvinar purus condimentum&raquo;</span>
                </p>
            </div>
            <div class="subscribe-form-wrp">
                <span class="subscribe-form-title">subscribe</span>
                <span class="subscribe-form-subtitle">subscribe for our newletter and promotion</span>
                <form action="#" class="subscribe-form">
                    <input class="subscribe-form-email" type="email" placeholder="Enter Your Email" required>
                    <input class="subscribe-form-btn" type="submit" value="Subscribe">
                </form>
            </div>
        </div>
    </section>
    `
})
