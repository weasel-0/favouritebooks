(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiJjbHRyZTFtNnQxNTI5MTYxMGh2NXQ2ZTh2ZDhvIiwidHlwZSI6IkFDQ0VTU19UT0tFTiIsInRpbWVzdGFtcCI6MTcxNzAwNDk4MTU3OCwiaWF0IjoxNzE3MDA0OTgxLCJleHAiOjE3MzI3Mjk3ODF9.u17VCqNzoMwweBsaEHCy8g31cd52m3rROmfxuFsuVhE",d="https://literal.club/graphql/",u="favs-39n1d16",l=document.querySelector(".books"),f=document.querySelector("#refreshBooks"),p=`query getShelfBySlug($shelfSlug: String!) {
  shelf(where: { slug: $shelfSlug }) {
    id
    slug
    title
    description
    profileId
    books {
      id
      slug
      title
      description
      pageCount
      publishedDate
      authors {
        name
      }
    }
  }
}`;async function c(){const o=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:p,variables:{shelfSlug:u}})}),{data:t}=await o.json();console.log(t.shelf.books);const r=t.shelf.books;h(r)}function h(o){l.innerHTML="",o.forEach(t=>{l.innerHTML+=`
      <div
          class="grid grid-cols-12 gap-2 font-display font-normal mb-1"
      >
          <div class="col-span-4">${t.title}</div>
          <div class="col-span-3">${t.authors?t.authors[0].name:""}</div>
          <div class="col-span-3">${t.publishedDate?t.publishedDate.substring(0,4):""}</div>
          <div class="col-span-2">${t.pageCount}</div>
      </div>
      <div
          class="border-t border-sky-900 border-opacity-50 leading-none text-base md:text-xl"
      >`})}f.addEventListener("click",c);c();
