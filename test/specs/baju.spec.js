import { browser, $, expect } from '@wdio/globals'


//buat befornya dl sebelum diklik ke produk yg mau di klik

describe ('Test Website Nadjani', function () {
    it('Menampilkan nama produk', async function () {
        await browser.url('https://nadjani.com/product/sunjae-pink')

        const productName = await $ ('.product_title.entry-title')
        const productNameText = await productName.getText()
        // const productName = $ ('.product-title').getText()
        // expect(productName).to('Sunjae Pink')
        console.log('<||||> ini text nama produk<||||>', productNameText)
        expect(productNameText).toBe('Sunjae Pink')
    })

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
        const inputQtyMinus = await $('[name="qty"]') 
        
        const qtyAwalMinus = 3
        await inputQtyMinus.setValue(qtyAwalMinus) // set atau atur qty awal
    
        // Temukan dan Klik tombol minus
        const minusButton = await $('#btn_qty_minus.select-qty-minus') 
        await minusButton.waitForClickable() // Tunggu hingga tombol minus dapat diklik
        await minusButton.click()
    
        await browser.pause(3000)
       
        // Dapatkan qty setelah pengurangan
        const newQtyMinus = parseInt(inputQtyMinus.getValue())
        
        expect(newQtyMinus).toEqual(qtyAwalMinus - 1)
    })

    it.only('Klik tombol "Top" dan beralih halaman', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')


        const linkTop = await $('#content_left > div > div.summary.entry-summary.col-md-5 > div.category-name > a')
        await expect(linkTop).toHaveText('Top')
        await linkTop.click()

        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://nadjani.com/category/top')
        
    })

    it('Klik tombol "Ask Via WhatsApp" dan beralih halaman', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')


        const linkWA = await $('.ask-via-whatsapp')
        await linkWA.click()

        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://api.whatsapp.com/send?phone=6281220676314&text=Sunjae%20Pink%0Ahttps%3A%2F%2Fnadjani.com%2Fproduct%2Fsunjae-pink')
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

    
    it('Klik button Beli Sekarang ', async function () { //done
        // Buka halaman produk
        await browser.url('https://nadjani.com/product/sunjae-pink')

        const myButton = await $('#btn_add_to_cart')
        await myButton.waitForClickable()
        await myButton.click()
        await browser.pause(3000)

        await expect(browser).toHaveUrl('https://nadjani.com/cart') // buat test case expectnya nama produknya
        
    })

    // it.only('Hapus keranjang', async function () {
    //     // Buka halaman keranjang
    //     await browser.url('https://nadjani.com/cart')
    
    //     // Tunggu hingga tombol "Hapus" muncul untuk setiap produk dalam keranjang
    //     const tombolHapus = await $$('.remove')
        
    // })
    


})