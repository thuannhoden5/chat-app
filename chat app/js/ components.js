const components = {}; // chua cac giao dien
components.welcomeScreen=`    
<h1>Welcome to Chat app</h1>
`
components.registerScreen = `
<div class="register_container">
        <div class="aside_right">
            <div class="header">
                <h3>MindX chat</h3>
            </div>

            <form id="register_form">
                <div class="input_name_wrapper">
                    <div class="input_wrapper">
                        <input type="text" name="first_name" placeholder="First Name">
                        <div class="error" id="first_name_error"></div>
                    </div>
                    <div class="input_wrapper">
                        <input type="text" name="last_name" placeholder="Last Name">
                        <div class="error" id="last_name_error"></div>
                    </div>
                </div>
                <div class="input_wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id="email_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Password" name="password">
                    <div class="error" id="password_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Confirm Password" name="confirm_password">
                    <div class="error" id="confirm_password_error"></div>
                </div>
                <div class="form_action">
                    <span id="redirect_to_login" onclick="redirect_to_login()">
                        Already have an account? Login?
                    </span>
                    <button class="btn" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
`

components.loginScreen = `
<div class="login_container">
        <div class="aside_right">
            <div class="header">
                <h3>MindX chat</h3>
            </div>
            <form id="login_form">
                <div class="input_wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id="email_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Password" name="password">
                    <div class="error" id="password_error"></div>
                </div>
                <div class="form_action">
                    <span id="redirect_to_register" onclick="redirect_to_register()">
                        Don't have an account? Register ?
                    </span>
                    <button class="btn" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
`