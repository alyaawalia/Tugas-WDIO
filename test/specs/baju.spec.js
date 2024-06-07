import { browser, $, expect } from '@wdio/globals'


before('User harus berada pada halaman awal', async function () {
    await browser.url('https://nadjani.com/')
    const topUrl = await $('#home_adv > div:nth-child(2) > div.col-md-12.nopadding > div:nth-child(1) > a > img')
    await topUrl.click()

    const categoryUrl = await $('#content_left > ul > li:nth-child(17) > a')
    await categoryUrl.click()

})
describe ('Test Website Nadjani', function () {
    it('Tambah QTY dengan tombol plus', async function () {  //done 
        await browser.url('https://nadjani.com/product/sunjae-pink')

        // Dapatkan elemen input qty, 
        const inputQty = await $('[name="qty"]') //css selector atibut untuk mencocokkan elemen berdasarkan atribut dan nilainya
        // Dapatkan qty awal
        const qtyAwal = parseInt(inputQty.getValue())

        // Temukan dan Klik tombol plus
        const plusButton = await $('#btn_qty_plus.select-qty-plus') //css selector class dan id
        await plusButton.waitForClickable() //untuk nunggu sampe elemen plus bisa diklik. soalnya kl gapake ada error element click intercepted
        await plusButton.click()

        await browser.pause(3000)
       
        // Dapatkan qty setelah penambahan
        const newQty = parseInt(inputQty.getValue())
        
        expect(newQty).toEqual(qtyAwal + 1)
    })

    it('Mengurangi QTY dengan tombol minus', async function () { //done
        await browser.url('https://nadjani.com/product/sunjae-pink')
    
        // Dapatkan elemen input qty
        const inputQtyMinus = await $('#qty_product > option:nth-child(3)') //ubah jd 2
        
        //const qtyAwalMinus = 2 --> gabisa lngsung di set 2 karna ada option valuenya 
        //await inputQtyMinus.setValue(qtyAwalMinus) // set atau atur qty awal
        await inputQtyMinus.click()

        const minus = await $('[name="qty"]') //ambil nilainya yg udh jd 2
        const minusNew = parseInt(minus.getValue())

        // Temukan dan Klik tombol minus
        const minusButton = await $('#btn_qty_minus.select-qty-minus') 
        await minusButton.waitForClickable() // Tunggu hingga tombol minus dapat diklik
        await minusButton.click()
    
        //await browser.pause(3000)
       
        // Dapatkan qty setelah pengurangan
        const newQtyMinus = parseInt(minus.getValue())
        
        expect(newQtyMinus).toEqual(minusNew - 1)
    })

    it('Klik tombol "Top" dan beralih halaman', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')

        const linkTop = await $('#content_left > div > div.summary.entry-summary.col-md-5 > div.category-name > a')
        await linkTop.click()

        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://nadjani.com/category/top')
    })

    it('Klik tombol "Ask Via WhatsApp" dan switch tab ke whatsapp', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')

        const linkWA = await $('.ask-via-whatsapp')
        await linkWA.click()

        await browser.pause(3000)
        const window = await browser.getWindowHandles() //mengembalikan array untuk mengidentifikasi tabnya ada brp
        await browser.switchToWindow(window[1]) //pindah ke tab ke 2 setelah website nadjani
        const url = await browser.getUrl() 
        await expect(url).toBe('https://api.whatsapp.com/send?phone=6281220676314&text=Sunjae%20Pink%0Ahttps%3A%2F%2Fnadjani.com%2Fproduct%2Fsunjae-pink')
    })

    it('Klik tombol "SHOP" dan beralih halaman', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')

        const linkShop = await $('#headline > div > div > a:nth-child(3)') 
        await linkShop.click()

        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://nadjani.com/product')
    })

    it('Klik tombol "HOME" dan beralih halaman', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')


        const linkHome = await $('=HOME')
        await expect(linkHome).toHaveText('HOME')
        await linkHome.click()

        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://nadjani.com/home')
    })

    
    it('cari nama product', async function (){
        await browser.url('https://nadjani.com/product/sunjae-pink')

        // Cari elemen input untuk pencarian
        const searchInput = $('#search-box-2')

        // Masukkan kata kunci pencarian
        searchInput.setValue('Corry Ayra')
        await browser.pause(2000)

        // Submit button search
        browser.keys('Enter')
        await browser.pause(2000)

        const searchResult = $('#content_left > ul > li')
        expect(searchResult).toBeDisplayed()
    })
})

//     // it.only('Scroll Up', async function (){
//     //     await browser.url('https://nadjani.com/product/sunjae-pink')

//     //     // Cari elemen input untuk pencarian
//     //     const scroll = await $('#scroll-top > a')
//     //     await scroll.click()

//     //     //await browser.pause(3000)

//     //     await browser.execute(() => {
//     //         window.scrollBy(0, -window.scrollY)
//     //     })
//     // })

//     // it.only('Hapus keranjang', async function () {
//     //     // Buka halaman keranjang
//     //     await browser.url('https://nadjani.com/cart')
    
//     //     // Tunggu hingga tombol "Hapus" muncul untuk setiap produk dalam keranjang
//     //     const tombolHapus = await $$('.remove')
        
//     // })
