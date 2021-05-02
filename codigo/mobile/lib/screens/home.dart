import 'package:flutter/material.dart';
import 'package:mobile/widgets/button.dart';
import 'package:mobile/widgets/input.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _emailController = TextEditingController();
    final passwordController = TextEditingController();

    return Scaffold(
        appBar: AppBar(
          elevation: 0,
          actions: [ChangeThemeSwitch()],
        ),
        body: Center(
          child: SingleChildScrollView(
            physics: NeverScrollableScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Logo(),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 50, vertical: 10),
                  child: Column(
                    children: [
                      Column(
                        children: [
                          Input(
                            label: 'Email',
                            controller: _emailController,
                            icon: Icons.email,
                          ),
                          Input(
                            isPassword: true,
                            label: 'Senha',
                            icon: Icons.lock,
                            controller: passwordController,
                          ),
                        ],
                      ),
                      Button(
                        label: 'Entrar',
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).accentColor,
                        ),
                        textStyle: Theme.of(context).textTheme.headline6,
                        onPressed: () {},
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
