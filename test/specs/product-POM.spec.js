import { browser, expect } from '@wdio/globals'
import homePage from '../pageobjects/homePage.js'
import ProductPage from '../pageobjects/detaiProductPage.js'

describe('Test Website Nadjani', function () {
    before('User harus berada pada halaman awal', async function () {
        await homePage.open()
        await homePage.goToTopCategory()
        await homePage.goToSunjaePink()
    })

    it('Tambah QTY dengan tombol plus', async () => {
        await homePage.openPageSunjaePink()
        const awalQty = await ProductPage.getQty()
        await ProductPage.plusQty()
        const newQtyPlus = await ProductPage.getQty() 
        expect(newQtyPlus).toEqual(awalQty + 1)
    })

    it('Mengurangi QTY dengan tombol minus', async () => {
        await homePage.openPageSunjaePink() 
        await ProductPage.clickQtyInput() //set nilai qty jd 2
        const initialQty = await ProductPage.getQty(); // Dapatkan qty awal (2)
        await ProductPage.minusQty() //klik tombol minus sesudah nilai awal jd 2
        const newQty = await ProductPage.getQty() // dapatkan qty saat ini
        expect(newQty).toEqual(initialQty - 1)
    })

    it('Klik tombol "Top" dan beralih halaman', async function () {
        await homePage.openPageSunjaePink()
        await ProductPage.goToTopCategory()
        await expect(browser).toHaveUrl('https://nadjani.com/category/top')
    })

    it('Klik tombol "Ask Via WhatsApp" dan switch tab ke whatsapp', async function () {
        await homePage.openPageSunjaePink()
        await ProductPage.goToWhatsApp()
        const windowHandles = await browser.getWindowHandles() //mengembalikan array untuk mengidentifikasi tabnya ada brp
        await browser.switchToWindow(windowHandles[1]) //pindah ke tab ke 2 setelah website nadjani
        await browser.pause(3000) //hrs dipause karna butuh waktu buat kelink wa nya
        const url = await browser.getUrl()
        expect(url).toBe('https://api.whatsapp.com/send?phone=6281220676314&text=Sunjae%20Pink%0Ahttps%3A%2F%2Fnadjani.com%2Fproduct%2Fsunjae-pink')
    })

    it('Klik tombol "SHOP" dan beralih halaman', async function () {
        await homePage.openPageSunjaePink()
        await ProductPage.goToShop()
        await expect(browser).toHaveUrl('https://nadjani.com/product')
    })

    it('Klik tombol "HOME" dan beralih halaman', async function () {
        await homePage.openPageSunjaePink()
        await ProductPage.goToHome()
        await expect(browser).toHaveUrl('https://nadjani.com/home')
    })

    it('Cari nama product', async function () {
        await homePage.openPageSunjaePink()
        await ProductPage.searchProduct('Corry Ayra')
        const searchResult = $('#content_left > ul > li')
        expect(searchResult).toBeDisplayed()
    })
    
})
