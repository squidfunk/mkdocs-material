# DataGrip-MotherDuck Docs

* Source: <https://motherduck.com/docs/integrations/sql-ides/datagrip/>

# DataGrip

JetBrains [DataGrip](https://www.jetbrains.com/datagrip/) is a cross-platform IDE for working with SQL and noSQL databases. It includes a DuckDB integration, which makes connecting to MotherDuck easy.

## Connecting to MotherDuck in DataGrip[​](https://motherduck.com/docs/integrations/sql-ides/datagrip/#connecting-to-motherduck-in-datagrip "Direct link to Connecting to MotherDuck in DataGrip")

Start by creating a new data source, selecting DuckDB as the database engine. This opens up the **Data Sources and Drivers** window.

### Token Authentication[​](https://motherduck.com/docs/integrations/sql-ides/datagrip/#token-authentication "Direct link to Token Authentication")

To retrieve a MotherDuck token, follow the steps in [Authenticating to MotherDuck](https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/authenticating-to-motherduck/).

In **Data Sources and Drivers > General**, select **No auth** option for **Authentication**. Then, fill out the **URL** field following this format, replacing `my_db` with your target MotherDuck database or leaving it out if no specific database is targeted:

```sh
jdbc:duckdb:md:[my_db]
```

![config](https://motherduck.com/docs/assets/images/datagrip_config-cf38553fdc57bd2d5431ba3e6afb468f.png)

In the **Data Sources and Drivers > Advanced** tab, add a variable `motherduck_token` set to the token retrieved from the prior step.

![config](https://motherduck.com/docs/assets/images/datagrip_token-bdcc85d3f7c987f4419cdd9d1894ce7b.png)

Click "OK" to begin querying MotherDuck!

note

The default schema filtering configuration of DataGrip may hide some of the schemas that exist in your MotherDuck account. Reconfigure to display all schemas following [DataGrip documentation](https://www.jetbrains.com/help/datagrip/schemas.html).
