<script setup>
    import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
</script>

<template>
    <div style="width:60%">
       <h1 class="text-primary">
        {{ $t("Set up your domain to use domain email")}}
        </h1>
        <p class="text-primary">
            <ol>
                <li>
                    {{$t("Log in to your DNS management panel") }} 
                </li>
                <li>
                    {{  $t("Add the primary mail server (MX record).") }}
                </li>
                <li>
                    {{  $t("Add the secondary mail server (MX record).") }}
                </li>
                <li>
                    {{  $t("Add SPF record (TXT record)") }}
                </li>
                <li>
                    {{  $t("Add DAMRC record (TXT record)") }}
                </li>
                <li>
                    {{  $t("Add DKIM record (make sure the value is one line) (TXT record).") }}
                </li>
                <li>
                    {{  $t("In this webiste create new email account for your domain") }}
                </li>
                <li>
                    {{  $t("Use your favorite email client ,use  the imap/pop3 setting for receive email and use smtp setting to send email.") }}
                </li>
            </ol>

        </p>




        <h4>{{ $t("Domain DNS Setting") }}</h4>
                    <h5>
                        <label class="form-control-label">{{$t('Main Mail DNS Setting')}}</label>
                    </h5>

                    <Button @click="check_dns_record(form.domain,'MX',form.mail1_server)">{{ $t("Check My Domain DNS Setting") }}</Button>
                    <p> </p>

                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Type")}}</td>
                                <td>MX</td>
                            </tr>
                            <tr>
                                <td>{{$t("Name")}}</td>
                                <td>@</td>
                            </tr>
                            <tr>
                                <td>{{$t("Value")}}</td>
                                <td>{{ form.mail1_server }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Priority")}}</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>
                        <label class="form-control-label">{{$t('Second Mail DNS Setting')}}</label>
                    </h5>
                    <Button @click="check_dns_record(form.domain,'MX',form.mail2_server)">{{ $t("Check My Domain DNS Setting") }}</Button>
                    <p> </p>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Type")}}</td>
                                <td>MX</td>
                            </tr>
                            <tr>
                                <td>{{$t("Name")}}</td>
                                <td>@</td>
                            </tr>
                            <tr>
                                <td>{{$t("Value")}}</td>
                                <td>{{ form.mail2_server }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Priority")}}</td>
                                <td>20</td>
                            </tr>
                        </tbody>
                    </table>


                    <h5>
                        <label class="form-control-label">{{$t("SPF DNS Setting")}}</label>
                    </h5>
                    <Button @click="check_dns_record(form.domain,'TXT','v=spf1 a:'+form.smtp_server+' -all')">{{ $t("Check My Domain DNS Setting") }}</Button>
                    <p> </p>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Type")}}</td>
                                <td>TXT</td>
                            </tr>
                            <tr>
                                <td>{{$t("Name")}}</td>
                                <td>{{ form.domain }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Value")}}</td>
                                <td> 
                                    v=spf1 a:{{form.smtp_server}} -all
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>
                        <label class="form-control-label">{{$t("DAMRC DNS Setting")}}</label>
                    </h5>
                    <Button @click="check_dns_record('_dmarc.'+form.domain,'TXT', 'v=DMARC1; p=quarantine; rua=mailto:'+form.mail_report_email )">{{ $t("Check My Domain DNS Setting") }}</Button>
                    <p> </p>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Type")}}</td>
                                <td>TXT</td>
                            </tr>
                            <tr>
                                <td>{{$t("Name")}}</td>
                                <td>_dmarc</td>
                            </tr>
                            <tr>
                                <td>{{$t("Value")}}</td>
                                <td> 
                                    v=DMARC1; p=quarantine; rua=mailto:{{ form.mail_report_email }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>
                        <label class="form-control-label">{{$t("DKIM DNS Setting")}}</label>
                    </h5>
                    <Button @click="check_dns_record(form.domain+'._domainkey.'+form.domain,'TXT', form.domain_dkim_public_key )">{{ $t("Check My Domain DNS Setting") }}</Button>
                    <p> </p>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Type")}}</td>
                                <td>TXT</td>
                            </tr>
                            <tr>
                                <td>{{$t("Name")}}</td>
                                <td>
                                    {{form.domain}}._domainkey 
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Value")}}</td>
                                <td> 
                                    <!--  
                                    <textarea cols="80" rows="6">v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArv8F8Ja2dBF+UKL1x0BxZ5Tv9fXQbK2b9eMy0zvD7ZawFiZiY7di2QeONIXfhACNIEqbMuVelUdOlDzv+svGRs8n0TGcdKUW1M0aIBfy3z+uUgd1Spzxo8wBpYtFTOzj2IqB6+3HIDDr224s+PNE8HWjWP2/CGinPlepqhZk2OY3tOm66ZueSL7fqXFEVKW/Q" "qGFtDcl7VhUzM2wjEoZ4XZCx7v0i72AZ3oEExf64Jqi/10zVz4znpeakdJgk0pxy7ph3Ks0VNohPsuAMcqVzfQojGZlXHuWYMB/xFS+WWXNGxVgtp4h77Op2xDhhT7oEDtDwnNkgJ8qE5ABy6WTqQIDAQAB</textarea>
                                    -->
                                    <textarea cols="80" rows="6">{{ form.domain_dkim_public_key }}</textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
   

  
        <h4>{{ $t("Email Client Setting") }}</h4>
                    <h5>
                        <label class="form-control-label">{{$t('IMAP Setting')}}</label>
                    </h5>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Server")}}</td>
                                <td>{{ form.mail1_server }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Secure")}}</td>
                                <td>
                                    ssl/tls
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Port")}}</td>
                                <td>
                                    993
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Username")}}</td>
                                <td> 
                                    your email account  (e.g   test@test.com)
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Password")}}</td>
                                <td> 
                                     your email account password (e.g 111111)
                                </td>
                            </tr>

                        </tbody>
                    </table>


                    <h5>
                        <label class="form-control-label">{{$t('POP3 Setting')}}</label>
                    </h5>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Server")}}</td>
                                <td>{{ form.mail1_server }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Secure")}}</td>
                                <td>
                                    ssl/tls
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Port")}}</td>
                                <td>
                                    995
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Username")}}</td>
                                <td> 
                                    your email account  (e.g   test@test.com)
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Password")}}</td>
                                <td> 
                                     your email account password (e.g 111111)
                                </td>
                            </tr>

                        </tbody>
                    </table>


                    <h5>
                        <label class="form-control-label">{{$t('SMTP Setting')}}</label>
                    </h5>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{{$t("Server")}}</td>
                                <td>{{ form.smtp_server }}</td>
                            </tr>
                            <tr>
                                <td>{{$t("Secure")}}</td>
                                <td>
                                    starttls
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Port")}}</td>
                                <td>
                                    587
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Username")}}</td>
                                <td> 
                                    your email account  (e.g   test@test.com)
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t("Password")}}</td>
                                <td> 
                                     your email account password (e.g 111111)
                                </td>
                            </tr>

                        </tbody>
                    </table>
      

    </div>
</template>

<script>
    export default {
        created:async function(){
            var item_id=this.$route.query.id;

            if(item_id)
            {
                var response=await this.$api.api_get("/api/admin/domain/get_setting_data",{"id":item_id});
                this.form=response
            }
        },
        data: function(){
            return {
                form:{
                    domain:"",
                    domain_dkim_public_key:"",
                    mail1_server:"mail1.example.com",
                    mail2_server:"mail2.example.com",
                    smtp_server:"smtp.example.com",
                    mail_report_email:"root@example.com",
                },
            }
        },

        methods:{
            check_dns_record:async function(domain,type,value){
                var params={
                    "domain":domain,
                    "type":type,
                    "value":value,
                };
                var response = await this.$api.api_post("/api/admin/domain/check_dns_record_value",params);
                if(response == false) return false;

                this.$alert(this.$t("SUCCESS"),this.$t("Your dns setting is correct"));
            },
        },

    }
</script>

<style scoped>
</style>
