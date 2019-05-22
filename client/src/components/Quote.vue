<template>
  <div class="col-sm-12 well">
    <div class="card">
      <div class="card-header">Quote</div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ jokes.data.attachments[0].text }}</p>
          <footer class="blockquote-footer">
            Someone famous in
            <cite title="Source Title">hacktiv8</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['jokes'],
}
</script>
