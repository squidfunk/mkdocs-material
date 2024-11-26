# Integrating the Unified Namespace into Your Enterprise Architecture: An Architect's Guide

By clicking **“Accept All Cookies”**, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. View our [Privacy Policy](https://www.umh.app/privacy) for more information.

[Preferences](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#) [Deny](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#) [Accept All Cookies](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#)

Privacy Preference Center

When you visit websites, they may store or retrieve data in your browser. This storage is often necessary for the basic functionality of the website. The storage may be used for marketing, analytics, and personalization of the site, such as storing your preferences. Privacy is important to us, so you have the option of disabling certain types of storage that may not be necessary for the basic functioning of the website. Blocking categories may impact your experience on the website.

[Reject all cookies](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#) [Allow all cookies](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#)

Manage Consent Preferences by Category

Essential

**Always Active**

These items are required to enable basic website functionality.

Marketing

[ ]Essential

These items are used to deliver advertising that is more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns. Advertising networks usually place them with the website operator’s permission.

Personalization

[ ]Essential

These items allow the website to remember choices you make (such as your user name, language, or the region you are in) and provide enhanced, more personal features. For example, a website may provide you with local weather reports or traffic news by storing data about your current location.

Analytics

[ ]Essential

These items help the website operator understand how its website performs, how visitors interact with the site, and whether there may be technical issues. This storage type usually doesn’t collect information that identifies a visitor.

[Confirm and close](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#)

Submit

[IT / OT Architecture](https://learn.umh.app/topic/it-ot-architecture/) · Jun 22, 2023

# Integrating the Unified Namespace into Your Enterprise Architecture: An Architect's Guide

The article delves into the different data requirements of frontline workers and business analysts, the roles of OLTP and OLAP databases, and the concept of Lambda Architecture for managing large volumes of real-time and historical data.

* [![](https://learn.umh.app/content/images/size/w30/2023/02/Jeremy_huc484169f1c4136c603a7df27dcdff14f\_371473\_1200x0\_resize_q75\_box.jpg) ](https://learn.umh.app/instructor/jeremy/)

  [ Jeremy Theocharis](https://learn.umh.app/instructor/jeremy/)

The article delves into the different data requirements of frontline workers and business analysts, the roles of OLTP and OLAP databases, and the concept of Lambda Architecture for managing large volumes of real-time and historical data.

![Integrating the Unified Namespace into Your Enterprise Architecture: An Architect's Guide](https://learn.umh.app/content/images/size/w30/2023/06/OLTP-\_-OLAP\_\_4-3.png)

Table of Contents * ***

1. [Dashboards for Frontline Workers and Business Analysts - Bridging OLTP and OLAP](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#dashboards-for-frontline-workers-and-business-analystsbridging-oltp-and-olap)

2. [Processing Large Amounts of Data - Real-Time and Historical: The Lambda & Kappa Architectures](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#processing-large-amounts-of-datareal-time-and-historical-the-lambda-kappa-architectures)

3. [One Architecture to rule them all,](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#one-architecture-to-rule-them-all)

   1. [Bringing OLTP, OLAP and Lambda together into a UNS-based architecture](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#bringing-oltp-olap-and-lambda-together-into-a-uns-based-architecture)
   2. [Anti-patterns](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#anti-patterns)
   3. [How we do it at the United Manufacturing Hub](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#how-we-do-it-at-the-united-manufacturing-hub)

4. [Summary](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#summary)

5. [Acknowledgement](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#acknowledgement)

6. [TL;DR powered by ChatGPT](https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/#tldr-powered-by-chatgpt)

💡

TL;DR aka "Executive Summary" can be found at the end of the article

"Never change a running system." It's a philosophy I've always adhered to. Excitement in tech usually equates to instability, something I'm not particularly fond of. It might sound strange coming from a startup CTO, but let me explain in this article what I mean.

If you've found your way to this article, it's likely because the idea of a [Unified Namespace (UNS)](https://learn.umh.app/lesson/introduction-into-it-ot-unified-namespace/) intrigues you. You're considering how it could fit into your company's framework, potentially streamlining processes and enhancing data handling. But you're faced with a hurdle - how do you integrate the UNS with your established IT landscape, systems such as AWS, Azure, Data Lakes, and Data Warehouses?

Unified Namespace is a powerful tool, a form of [event-driven architecture](https://learn.umh.app/lesson/introduction-into-it-ot-software-architecture/#event-driven-architecture) where all data is published irrespective of immediate demand. However, its practical integration with traditional IT frameworks often leaves many scratching their heads.

In this article, we'll provide a roadmap to successfully incorporate UNS into your enterprise architecture. We'll navigate the distinct requirements of frontline workers and business analysts in Chapter 1, exploring the roles of OLTP and OLAP databases. Chapter 2 will focus on managing large volumes of real-time and historical data through the lens of the Lambda Architecture. In the final chapter, we'll tie everything together, offering an actionable approach to integrate these elements seamlessly into your enterprise landscape.

Along this journey, if you find value in these insights, I'd encourage you to connect with us. Whether it's through LinkedIn, Discord, or our newsletter, we're always keen to engage with like-minded professionals looking to make the most of technologies like the Unified Namespace.

## **Dashboards for Frontline Workers and Business Analysts - Bridging OLTP and OLAP**

Navigating the diverse data needs of frontline workers and business analysts requires the tactful orchestration of two distinct types of databases - OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing). On the one hand, frontline workers need immediate access to up-to-date data to ensure smooth operation of the factory. On the other hand, business analysts require both breadth and depth of data, spanning extended periods, to identify potential improvement opportunities. This is where OLTP systems come in for frontline workers, and OLAP systems for business analysts.

**OLTP Systems** are built for routine transactions, analogous to your daily online banking or shopping. Mostly used by end-users or customers through web applications, these systems strive to keep data current at all times. They handle datasets ranging from gigabytes to terabytes in size, with a majority of SQL databases qualifying as OLTP databases.

In contrast, **OLAP Systems** or Data Warehouses are tailored for more complex tasks like data mining, business intelligence, and intricate analytical calculations. These systems are capable of handling immense volumes of data, often used for bulk data import (ETL) or data streams. Primarily leveraged by internal analysts for decision support, OLAP systems hold larger datasets, from terabytes to petabytes. Some examples include Data Warehouses, Data Lakes, Azure Synapse Analytics, AWS Redshift, and others.

To harmonize the functions of these two systems, an **ETL (Extract, Transform, Load)** process is typically used. Traditionally, this is a batch process, often executed overnight. It extracts data from the OLTP system, transforms it to be analytically useful, and loads it into the OLAP system.

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_1.png)

OLTP and OLAP databases in manufacturing connected with an ETL process.

As the image above illustrates, in a manufacturing process, data from a Production Order Database (from a MES) and a Stock Lists Database (from an ERP) feed into an ETL process. This processed data is then stored in a Data Warehouse where business analysts can analyze the data. A shop floor supervisor inputs data into the MES, while the Warehouse Manager feeds data into the ERP system.

But in the modern data landscape, the demand for real-time insights is transforming the traditional ETL processes. The recent trend veers towards real-time or near real-time ETL processes (see image below). In this approach, data is streamed from the OLTP to the OLAP system as events occur, a technique known as **Change Data Capture (CDC)**, facilitated by tools like [Debezium](https://debezium.io/?ref=learn.umh.app) and [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html?ref=learn.umh.app). The data undergoes transformation and loading into the OLAP system almost instantly, in a process called "streaming ETL" or "real-time ETL". This real-time data stream is highly beneficial for real-time analytics, fraud detection, and system monitoring, with platforms like [Apache Kafka](https://learn.umh.app/lesson/introduction-into-it-ot-kafka/) being commonly employed.

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_2.png)

Connecting OLTP with OLAP databases using a real-time ETL process and Apache Kafka

If you're familiar with the **Unified Namespace (MQTT + Kafka)**, you might find similarities between it and the real-time ETL process. This is because the Unified Namespace effectively bridges the gap between the OLTP and OLAP systems. It links all the relational databases on the shop floor with data from other devices, such as PLCs, offering a continuous stream of change events from the Operational Technology (OT) world. This streaming data signifies the 'Extract' step in the ETL process. Moreover, the data within the Unified Namespace undergoes 'contextualization' - a parallel to the 'Transform' step in ETL, which adjusts tag names, performs minor calculations, and prepares data for analytical use.

While the Unified Namespace, combining MQTT and Kafka, shows resemblances to a real-time ETL process, it's important to clarify its unique characteristics. The 'Unified Namespace' is encapsulated within quotes as it functions similarly to an ETL process only when Kafka is incorporated. Standard message brokers like MQTT lack an internal storage feature, vital for data processing beyond delivery. This means, without Kafka, we miss out on features such as backpressure handling and the ability to replay historical data. To understand this in more depth and understand why you need MQTT and (!) Kafka, refer to our article ["Tools & Techniques for Scalable Data Processing in Industrial IoT"](https://learn.umh.app/blog/tools-techniques-for-scalable-data-processing-in-industrial-iot/).

Now that we've traversed the landscape of OLTP and OLAP databases and seen the shift to real-time ETL processes, we're equipped to explore further. In the next chapter, we will turn our attention to the Lambda Architecture.

## **Processing Large Amounts of Data - Real-Time and Historical: The Lambda & Kappa Architectures**

Introduced between the early and mid-2010s, the Lambda Architecture was devised to blend emerging real-time ETL and streaming analytics such as those within the Kafka ecosystem, with conventional batch processing tools, for instance, MapReduce.

This architecture is built upon three core layers: a batch layer, a speed layer (also known as the hot path), and a serving layer. The batch layer, often seen as the computational engine, provides extensive and precise views of batch data. On the other hand, the speed layer caters to the immediate demands of real-time data, while the serving layer allows for querying the combined output of the batch and speed layers.

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_3.png)

The Lambda Architecture

The architecture draws its name from the Greek letter "λ" (lambda), with the symbol's intersecting lines depicting the dual paths of the speed and batch layers. Under this architectural blueprint, the Unified Namespace serves as the speed layer. To give a real-world example, let's examine a Predictive Maintenance scenario in a Lambda Architecture setting:

* **Speed Layer (Unified Namespace)**: This layer handles real-time data from machinery. Any anomalies from the standard patterns, as flagged by the model trained on the batch layer, would trigger immediate alerts for rectification. The output from the speed layer provides a real-time view of machine health.
* **Batch Layer**: This layer manages and processes historical data from machinery, such as temperature readings, vibrations, hours of operation, and error logs. At scheduled intervals, machine learning models are trained on this data, allowing them to predict potential failures or maintenance needs outputting AI models. The outcome is also a batch view that presents predictions based on patterns discovered in the historical data.
* **Serving Layer**: This layer marries the historical predictions from the batch layer with the real-time health data from the speed layer (Unified Namespace). It enables quick access to predictive maintenance data, facilitating both historical trend analysis and real-time machinery health monitoring. This layer often manifests as a "dashboard" that displays both the current equipment status and the historical data for contextual understanding.

Using the Lambda Architecture design pattern with the Unified Namespace as the speed layer allows shop floor supervisors to access all pertinent information in one centralized location. However, it's essential to consider whether this architecture might be an overcomplication for some use-cases.

Common tools used in the Batch Layer, such as MapReduce, are typically employed for processing terabytes of data – a scenario not often encountered in manufacturing. Specifically, [MapReduce was developed by Google in 2004 to build indexes for its search engine](https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf?ref=learn.umh.app). The only frequent use-case requiring such extensive data processing involves machine learning and model building. For instance, storing all product images and retraining the machine learning model on a weekly basis.

One of the drawbacks of the Lambda Architecture is the need to maintain identical logic across multiple systems (speed and batch), and the challenge of harmonizing real-time and batch analyses in the serving layer.

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_\_7\_Kappa.png)

Kappa architecture does only have the speed layer - no batch layer

Alternatives, like the **Kappa Architecture**, have been proposed. Jay Kreps, CEO of Confluent and the driving force behind Apache Kafka, introduced the Kappa Architecture in 2014. Notably, this architecture omits the batch layer, which makes the system much more easier to maintain. If you want to find more about it, where its used, and what the differences are compared to Lambda architecture, check out Kai Waehner's blog post about it called ["Kappa Architecture is Mainstream Replacing Lambda"](https://www.kai-waehner.de/blog/2021/09/23/real-time-kappa-architecture-mainstream-replacing-batch-lambda/?ref=learn.umh.app).

As we move to the next chapter, we'll address a common question: "This sounds great, but how can I apply this in my manufacturing setup?" We'll explore how all these components fit together in a practical, industry-specific context, further unlocking the power and potential of the Lambda Architecture.

## One Architecture to rule them all,

One Architecture to find them, One Architecture to bring them all, and in the enlightenment bind them; in the land of manufacturing where IT / OT components lie.

![](https://www.explainxkcd.com/wiki/images/c/ca/moria.png)

obligatory xkcd #760 "Moria"

As a reminder of our journey so far, we've examined the role of OLTP databases for frontline workers, OLAP databases for business analysts, and Lambda Architecture to handle real-time and historical data. Now, we'll explore how to integrate these components effectively.

### Bringing OLTP, OLAP and Lambda together into a UNS-based architecture

Let's visualize and understand how these elements collaborate in a single, harmonious system (see image below).

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_\_4-2.png)

The concepts of OLTP, OLAP, ETL, Lambda, Unified Namespace, Data Warehouse all combined in a single architecture

Relational databases such as the MES or ERP on the shop floor are linked to Kafka via Change Data Capture (CDC), as discussed in Chapter 1. This establishes a real-time ETL connection from the OLTP databases to the Unified Namespace (UNS), further extending it to the OLAP databases. In the manufacturing context, we incorporate additional data sources from the shop floor - IoT devices like PLCs, cameras, sensors, and more - either from the automation pyramid or entirely new data sources. These devices are typically connected to an [MQTT broker](https://learn.umh.app/blog/comparing-mqtt-brokers-for-the-industrial-iot/), which then bridges to Kafka. MQTT efficiently handles numerous unreliable connections, but struggles with large data volumes. Kafka, on the other hand, excels in processing large amounts of data but struggles with maintaining numerous unreliable connections. In manufacturing, these strengths are typically combined to optimal effect. The connection from the shop floor to the UNS, also known as IT/OT connectivity, often involves other protocols like [OPC-UA](https://learn.umh.app/lesson/introduction-into-it-ot-opc-ua/) besides [MQTT](https://learn.umh.app/lesson/introduction-into-it-ot-mqtt/).

A Lambda architecture is built atop Kafka. The speed layer comprises one or more "stream processors" that take raw data from Kafka, "contextualize" or "transform" it (e.g., changing tag names, providing background information like unit, etc.), and then send processed data back to Kafka and into the serving layer. The batch layer is connected to Kafka and the serving layer as well and takes raw data from Kafka, and transforms it through regular batch jobs, such as training an AI model or calculating the Overall Equipment Effectiveness (OEE), returning the results to Kafka and the serving layer. If batch jobs are not required, then one can leave out the batch layer and opt-in for a more "Kappa-styled" architecture.

The serving layer offers access to all real-time (speed layer) and historical data (batch layer + IIoT database) via an API such as REST or GraphQL. The shop floor supervisor can access it using a tool like [Grafana ](https://learn.umh.app/lesson/introduction-into-it-ot-tools/)for "centralized shop floor dashboards." As all data, raw, real-time processed, and batch-processed, is available in Kafka, the business analyst only needs to subscribe to it and transfer it into his Data Warehouse or Data Lake to run analytics, create reports in BI tools, or develop new AI models.

Certainly, you might think: This is an impressive architecture, but merely showcasing dashboards doesn't enhance production. You'd be correct. All the insights we've generated are readily accessible in the Unified Namespace. This means it's now incredibly straightforward to subscribe to any data type—be it raw data like PLC tags, derived real-time data such as current equipment status (in the diagram called "processed data"), or batch data like the OEE—and subsequently trigger an action on the shop floor.

These actions could range from turning a traffic light red to automatically discarding a defective product in instances of AI-assisted quality control and image classification. In the jargon of data architecture, this is known as "Reverse-ETL."

### Anti-patterns

Let's discuss some common pitfalls encountered when implementing such an architecture and potential solutions to these issues (see also below image).

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_\_5-1.png)

Three anti-patterns in combining OLTP and OLAP databases within a Unified Namespace architecture

**Anti-Pattern 1:** Storing data from the Unified Namespace in an OLTP database, and then appending additional system information creates a gap between OLTP and OLAP systems. One solution is to write into the OLTP database exclusively via the UNS. One company we know added data directly in via SQL into the IIoT database. It worked perfectly fine, but then they lost themselves in spaghetti diagrams when talking about how one can send this information to other systems as well.

**Anti-Pattern 2:** Using the Data Warehouse for frontline workers. Some analyses demand too much time to be useful for "real-time dashboard" and need to be cached to improve performance. One factory we know sent all their data into an Azure based Data Lake and retrieved it via PowerBI. It was great for reporting, but the time delays were to much for working with it on the shopfloor.

**Anti-Pattern 3:** Using the inappropriate calculation type (stream or batch) for the specific use-case. We have synchronous (API accessing the database with caching) and batch calculations (performing it nightly). Then there's stream processing (e.g., not recommended for OEE). One factory we know tried to do everything using batch processing, which was fine for reporting, but really not helpful to identify whether a product was good/bad during the production cycle.

### How we do it at the United Manufacturing Hub

Let's take a look at how United Manufacturing Hub (UMH) has seamlessly integrated all these components and provide a brief explanation.

![](https://learn.umh.app/content/images/2023/06/OLTP-\_-OLAP\_\_6-1.png)

The UMH Integrated Platform is a cloud-based application designed to streamline management of your IIoT infrastructure.

**In the United Manufacturing Hub, we offer most (though not all) of these components by default in a single package.** For more information, [check out this link](https://umh.docs.umh.app/docs/?ref=learn.umh.app). With a tool like Debezium, one can connect existing relational databases on the shop floor. Common databases like PostgreSQL or Microsoft SQL are far easier to connect than rare databases such as SQL Anywhere.

Devices on the shop floor can be connected either via our microservices [sensorconnect](https://umh.docs.umh.app/docs/features/ifm-retrofitting/?ref=learn.umh.app), [barcodereader](https://umh.docs.umh.app/docs/features/barcodereader-retrofitting/?ref=learn.umh.app), or the open-source [benthos-umh](https://www.umh.app/product/protocol-converter?ref=learn.umh.app) (for OPC-UA), or via standard connectivity tools like [Node-RED](https://learn.umh.app/blog/node-red-in-industrial-iot-a-growing-standard/) or [Kepware](https://learn.umh.app/blog/leveraging-kepware-in-iiot-and-how-to-mitigate-its-shortcomings/). Everything lands up then in HiveMQ and Redpanda (Kafka-compatible software). The real-time data can then be processed in Node-RED, benthos-umh (our recommendation for scalable data processing, although it may not be intuitive for OT engineers), or any other tool available on the market (Apache NiFi, Crosser, HighByte, etc.).

Redpanda is our choice over traditional Apache Kafka as it fits better the typical UMH user, who often deploys UMH at the edge. Here, the advantages of simplicity and resource efficiency take precedence over scalability. Although Redpanda is Kafka-compatible, it's important to note that its relying on the Kafka protocol and does not offer the full set of Kafka's features. For instance, offerings like tiered storage aren't available with Redpanda. However, we find its lightweight design, based on C++, very suitable for the needs of the typical UMH user. Larger enterprises often opt for traditional Kafka solutions from companies like [Confluent](https://www.confluent.io/?ref=learn.umh.app)for their on-premise or cloud deployments, where different priorities (Maturity, Scalability, proven SLAs, etc.) over simplicity and resource efficiency may apply.

By default, data is automatically stored from the Unified Namespace in [TimescaleDB](https://learn.umh.app/blog/why-we-chose-timescaledb-over-influxdb/), where our custom-built API [factoryinsight ](https://umh.docs.umh.app/docs/features/analytics/?ref=learn.umh.app)serves as the serving layer. From there, tools like benthos or Node-RED can regularly query data (such as the OEE) and push it back to Kafka.

In our system at UMH, we've elected to diverge from the conventional Lambda Architecture, adopting instead a **Kappa-style design**. Typical computations carried out on the shop floor, like OEE, may be complex and take a few seconds, but they're not so intricate as to demand hours. Thus, a full-scale batch layer might be excessive, particularly when weighed against the trade-off of increased system maintenance.

Instead, we adopt a more streamlined approach. All data is stored in the IIoT database, and OEE calculations are performed only as needed, based on this existing data. Intermediate results, such as hourly OEE, are cached in Redis for efficiency.

To recap, the Lambda Architecture would typically employ a Kafka consumer or microservice to gather all data from Kafka, storing intermediary OEE results (like an hourly OEE) in a database. The serving layer would then consolidate these OEE results into a larger timeframe, such as a weekly OEE, and retrieve the most recent data from the speed layer to ensure the OEE is up to date. While this might seem excessive for OEE calculations, for other applications like AI model building, such an approach might be justified. Consequently, we've included it in this article to present a comprehensive architecture.

In the UMH, we do not provide a solution for the data warehouse, but our experience suggests that most business analysts are quite satisfied with a continuous stream of all changes in Kafka, simplifying the analytics process.

## Summary

Reflecting on my initial mantra, "Never change a running system," you can now appreciate its depth. It's not about being resistant to innovation or change, but leveraging existing, well-established tools and techniques to address our challenges. In this context, it translates to understanding how we can harness the power of familiar systems to integrate the Unified Namespace into our enterprise landscape successfully. We don't need to reinvent the wheel - just learn to use it more efficiently.

Throughout this journey, we began by understanding the distinct data requirements of frontline workers and business analysts, highlighting the roles of OLTP and OLAP databases. Moving forward, we dived into the nuances of managing large volumes of real-time and historical data through the lens of the Lambda Architecture. Finally, we brought these elements together, offering a practical approach to seamlessly integrate the Unified Namespace into your enterprise landscape.

Our aim is to foster understanding and inspire action. Therefore, let me reiterate the crux of our exploration: integrating the Unified Namespace into your enterprise architecture enables real-time and historical data management, effectively bridging the gap between your operational technology (OT) systems and your IT landscape.

## Acknowledgement

Thank you to the following persons for providing me with feedback and guiding me through writing this article:

* [Pascal Brokmeier](https://www.linkedin.com/in/pascalwhoop?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABdgFGUBwi9Oijz2JNuN9305mvd68VL7\_M4\&lipi=urn%3Ali%3Apage%3Ad_flagship3\_search_srp_all%3BNsebc7c8SlOW7LsP4X938Q%3D%3D\&ref=learn.umh.app)
* [Kai Waehner](https://www.linkedin.com/in/kaiwaehner/?ref=learn.umh.app)
* [Akos Csiszar](https://www.linkedin.com/in/akos-csiszar?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC2l998BW5F3hGfy7FIg7WDOg-YDgq2rL-0\&lipi=urn%3Ali%3Apage%3Ad_flagship3\_search_srp_all%3BxFPtbId5SXqWoPlGV9CVCw%3D%3D\&ref=learn.umh.app)
* [Daniel Helmersson](https://www.linkedin.com/in/daniel-helmersson?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADYFGMkBamDwEQIHgCWro650f-aKrPts0jg\&lipi=urn%3Ali%3Apage%3Ad_flagship3\_search_srp_all%3Bhie%2FKhrNQ8q6znC%2F8Vpowg%3D%3D\&ref=learn.umh.app)
* ChatGPT (for helping me write proper sentences)

And of course our customers and community members for their feedback.

## TL;DR powered by ChatGPT

The article explains how to integrate a Unified Namespace (UNS) into enterprise architecture, specifically focusing on frontline workers and business analysts' diverse data needs. It highlights the role of OLTP and OLAP databases, the Lambda Architecture for handling real-time and historical data, and the concept of real-time ETL processes. The author suggests utilizing the UNS as the speed layer within the Lambda Architecture, bridging the gap between OLTP and OLAP systems. The piece concludes with a practical guide on harmoniously merging these components in a manufacturing setup, presenting the United Manufacturing Hub as a real-world example.

Share [* *Tweet ](https://twitter.com/share?text=Integrating%20the%20Unified%20Namespace%20into%20Your%20Enterprise%20Architecture%3A%20An%20Architect%27s%20Guide\&url=https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/ "Share on Twitter")[* *Share ](https://www.facebook.com/sharer.php?u=https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/ "Share on Facebook")[* *Share ](https://www.linkedin.com/shareArticle?mini=true\&url=https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/\&title=Integrating%20the%20Unified%20Namespace%20into%20Your%20Enterprise%20Architecture%3A%20An%20Architect%27s%20Guide\&summary=Integrating%20the%20Unified%20Namespace%20into%20Your%20Enterprise%20Architecture%3A%20An%20Architect%27s%20Guide "Share on Linkedin")[* *Email ](mailto:?subject=Integrating%20the%20Unified%20Namespace%20into%20Your%20Enterprise%20Architecture%3A%20An%20Architect%27s%20Guide\&body=https://learn.umh.app/blog/integrating-the-unified-namespace-into-your-enterprise-architecture-an-architects-guide/%C2%A0Integrating%20the%20Unified%20Namespace%20into%20Your%20Enterprise%20Architecture%3A%20An%20Architect%27s%20Guide "Share by email")* *Copy

## Read next

[![Why Most Manufacturing Software Sucks — and What We Do Differently at UMH](https://learn.umh.app/content/images/size/w30/2024/10/YT_Thumbnail\_3\_Approach-12.png)](https://learn.umh.app/blog/why-most-manufacturing-software-sucks-and-what-we-do-differently-at-umh/)

[IT / OT Architecture](https://learn.umh.app/topic/it-ot-architecture/) · Oct 11, 2024 Featured **

### [Why Most Manufacturing Software Sucks — and What We Do Differently at UMH](https://learn.umh.app/blog/why-most-manufacturing-software-sucks-and-what-we-do-differently-at-umh/)

At UMH, we’re building an integrated and user-centric solution for industrial IoT. In this article, we explore the shortcomings of typical manufacturing software and share how our unique approach addresses these challenges.

* [![](https://learn.umh.app/content/images/size/w30/2023/02/Jeremy_huc484169f1c4136c603a7df27dcdff14f\_371473\_1200x0\_resize_q75\_box.jpg) ](https://learn.umh.app/instructor/jeremy/)

  [ Jeremy Theocharis](https://learn.umh.app/instructor/jeremy/)

[![OLTP vs OLAP Databases and relevance within the Unified Namespace (UNS)](https://learn.umh.app/content/images/size/w30/2024/09/YT_Thumbnail_OLTP-vs-OLAP.png)](https://learn.umh.app/course/oltp-vs-olap-databases-and-relevance-within-the-unified-namespace-uns-2/)

· Sep 8, 2024

### [OLTP vs OLAP Databases and relevance within the Unified Namespace (UNS)](https://learn.umh.app/course/oltp-vs-olap-databases-and-relevance-within-the-unified-namespace-uns-2/)

In this video, we focus on the key differences between OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) systems, and how they fit into a Unified Namespace architecture.

* [![](https://learn.umh.app/content/images/size/w30/2024/01/Prikshit-Rao_LinkedIn-copy.jpeg) ](https://learn.umh.app/instructor/prikshit/)

  [ Prikshit Rao](https://learn.umh.app/instructor/prikshit/)

[![Components of the Unified Namespace (UNS)](https://learn.umh.app/content/images/size/w30/2024/09/YT_Thumbnail_unscomponents.png)](https://learn.umh.app/course/components-of-the-unified-namespace-uns/)

· Sep 4, 2024

### [Components of the Unified Namespace (UNS)](https://learn.umh.app/course/components-of-the-unified-namespace-uns/)

The Unified Namespace (UNS) offers a smarter, more scalable way to connect different components in industrial and IT/OT architectures. In this video, we cover the 5 basic components that enable it.

* [![](https://learn.umh.app/content/images/size/w30/2023/02/Jeremy_huc484169f1c4136c603a7df27dcdff14f\_371473\_1200x0\_resize_q75\_box.jpg) ](https://learn.umh.app/instructor/jeremy/)

  [ Jeremy Theocharis](https://learn.umh.app/instructor/jeremy/)

### Share, Engage, and Contribute!

Discover how you can share your ideas, contribute to our blog, and connect with us on other platforms.

[Explore the community](https://learn.umh.app/community/)
