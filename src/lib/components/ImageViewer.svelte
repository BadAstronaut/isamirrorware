<script lang="ts">
    interface ImageListProps {
      links: string[] ;
    }
  
    export let links: ImageListProps['links'];
</script>
  
  <div>
    {#if links}
    {#each links as link}
    <img src={link} alt="Imgur Image" />
  {/each}
    {/if}

    

    
  </div>