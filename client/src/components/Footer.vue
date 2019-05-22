<template>
    <footer class="footer">
        <div class="footer__content">
            <router-link to="https://twitter.com/mlutfiibra">
                <i class="fab fa-twitter" style="font-size: 24px;"></i>
            </router-link>
        </div>
        <div class="footer__content">
        &copy; 2019.
        Designed and Compiled by Muhammad Lutfi in Jakarta.
        </div>
        <div class="footer__content">
            <span>mlutfiibra@outlook.com</span>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scope>
.footer {
    display: flex;
    background-color: #fff;
    border-top: solid 1px #ededed;
    margin-top: 5em;
    justify-content: space-around;
    padding: .7em 0em;
}
.footer__content {
    text-align: center;
    padding: 8px 20px;
}
</style>
