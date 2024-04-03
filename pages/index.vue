<template>
    <div class="mx-auto h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-gray-500">
        <h1 class="pb-36 text-6xl font-bold uppercase">Queerly Positive</h1>
        <button class="border-2 border-black rounded-lg shadow-md shadow-gray-700 bg-black p-2 text-white hover:bg-zinc-400" @click=navigate>Klik hier om de test te beginnen</button>   
    </div>
</template>

<script setup>

const navigate = () => {
    navigateTo('/map');
}

</script>