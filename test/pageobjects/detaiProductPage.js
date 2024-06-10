import { browser, $ } from '@wdio/globals'

class ProductPage {
    //element locators
    get Text() {return $('#content_left > div > div.summary.entry-summary.col-md-5 > h1')}
    get inputQty() { return $('[name="qty"]') }
    get plusButton() { return $('#btn_qty_plus.select-qty-plus') }
    get qtyDropdown() { return $('#qty_product') }
    get minusButton() { return $('#btn_qty_minus.select-qty-minus') }
    get linkTop() { return $('#content_left > div > div.summary.entry-summary.col-md-5 > div.category-name > a') }
    get linkWA() { return $('.ask-via-whatsapp') }
    get linkShop() { return $('#headline > div > div > a:nth-child(3)') }
    get linkHome() { return $('=HOME') }
    get searchInput() { return $('#search-box-2') }
    get addToCartButton() { return $('#btn_add_to_cart')}
    get scrollButton() { return $('#scroll-top > a') }

    //page action
    async open(productUrl) {
        await browser.url(productUrl)
    }
    async getJudul() {
        return await this.Text.getText()
    }

    async getQty(){ //ambil qty awal
        return await this.inputQty.getValue()
    }

    async plusQty() {
        await this.plusButton.waitForClickable()
        await this.plusButton.click()
    }

    async getQty() {
        return parseInt(await this.inputQty.getValue());
    }
    async clickQtyInput() {
        const inputQtyMinus = await $('#qty_product > option:nth-child(3)')
        await inputQtyMinus.click()
    }
    
    async minusQty() {
        await this.minusButton.click()
    }

    async goToTopCategory() {
        await this.linkTop.click()
    }

    async goToWhatsApp() {
        await this.linkWA.click()
    }

    async goToShop() {
        await this.linkShop.click()
    }

    async goToHome() {
        await this.linkHome.click()
    }

    async searchProduct(keyword) {
        await this.searchInput.setValue(keyword)
        await browser.keys('Enter')
    }

    async addToCart() {
        await this.addToCartButton.waitForClickable()
        await this.addToCartButton.click()
    }

    async clickScrollButton() {
        await this.scrollButton.waitForClickable()
        await this.scrollButton.click()
    }

    async scrollDown() {
        await browser.pause(2000)
        await $ ('.ph-btn-activator').click()
        await $ ('.close-main-chat').click()
        await browser.execute(()=> window.scrollTo(0, 700))
        // await browser.scroll(0, 4000)
        await browser.pause(2000)

    
    }
}

export default new ProductPage()
