<template>
    <WebsiteTemplate>
       <div class="container py-4">
        <div class="row">
            <div class="col-md-8">
                <NotesArea/>
            </div>
            <div class="col-md-4">
            <TutorScreen/>
            </div>
        </div>
       </div>
    </WebsiteTemplate>
</template>
<script>
import WebsiteTemplate from '@/components/WebsiteTemplate.vue';
import TutorScreen from '@/components/Liveclass/TutorScreen'
import NotesArea from '@/components/Liveclass/NotesArea'
export default {
    name:"LiveClass",
    components:{
        WebsiteTemplate,
        TutorScreen,
        NotesArea
    },
    data() {
        return {
            
        }
    },
}
</script>