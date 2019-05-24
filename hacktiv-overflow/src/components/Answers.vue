<template>
<v-container fluid>
    <v-layout row>
   <v-flex xs3>
        <v-card flat>
          <v-card-text>
              <v-layout align-center justify-start column fill-height>
            <h4 class="text-md-center">VOTES</h4>
            <v-btn class="text-md-center" flat>
              <v-icon>fas fa-angle-up</v-icon>
            </v-btn>
            <div class="text-md-center">
              <h1 class="text-md-center">0</h1>
            </div>
            <v-btn class="text-md-center" flat>
              <v-icon>fas fa-angle-down</v-icon>
            </v-btn>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card flat>
          <v-card-text>
              <div class="text md-center">
                  <p>
                    {{answer.description}}
                  </p>
              </div>
              <div class="text-xs-right">
                 answer by: {{answer.idUser.name}}
              </div>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
</v-container>

</template>
<script>
export default {
  props: ['answer']
}
</script>
