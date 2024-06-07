import { browser, $ } from '@wdio/globals'

class ProductPage {
    //element locators
    get inputQty() { return $('[name="qty"]') }
    get plusButton() { return $('#btn_qty_plus.select-qty-plus') }
    get qtyDropdown() { return $('#qty_product') }
    get minusButton() { return $('#btn_qty_minus.select-qty-minus') }
    get linkTop() { return $('#content_left > div > div.summary.entry-summary.col-md-5 > div.category-name > a') }
    get linkWA() { return $('.ask-via-whatsapp') }
    get linkShop() { return $('#headline > div > div > a:nth-child(3)') }
    //get linkShop2() { return $ ('#headline > div > div > a:nth-child(3)')}
    get linkHome() { return $('=HOME') }
    get searchInput() { return $('#search-box-2') }

    //page action
    async open(productUrl) {
        await browser.url(productUrl)
    }
    async getQty(){ //ambil qty awal
        return await this.inputQty.getValue()
    }

    async plusQty() {
        //const qtyAwal = parseInt(await this.inputQty.getValue())
        await this.plusButton.waitForClickable()
        await this.plusButton.click()
        //return qtyAwal
    }

    async getQty() {
        return parseInt(await this.inputQty.getValue());
    }
    async clickQtyInput() {
        const inputQtyMinus = await $('#qty_product > option:nth-child(3)')
        await inputQtyMinus.click()
    }
    // async getCurrentQty() {
    //     return parseInt(await this.inputQty.getValue())
    // }
    
    async minusQty() {
        //await this.minusButtonButton.waitForClickable()
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
}

export default new ProductPage()
