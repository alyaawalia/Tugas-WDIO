//halaman awal di bagian homenya

class HomePage {
    get topUrl() { return $('#home_adv > div:nth-child(2) > div.col-md-12.nopadding > div:nth-child(1) > a > img') }
    get categoryUrl() { return $('#content_left > ul > li:nth-child(17) > a') }
    get sunjaePink() { return $ ('#content_left > ul > li:nth-child(19) > div > a.brand-name')}

    async open() {
        await browser.url('https://nadjani.com/')
    }

    async goToTopCategory() {
        await this.topUrl.click()
        //await this.categoryUrl.click()
    }

    async goToSunjaePink () {
        await this.sunjaePink.click()
    }

    async openPageSunjaePink () {
        await browser.url('https://nadjani.com/product/sunjae-pink')
    }
}

export default new HomePage()