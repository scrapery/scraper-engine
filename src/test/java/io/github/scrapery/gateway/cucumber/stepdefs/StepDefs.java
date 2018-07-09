package io.github.scrapery.gateway.cucumber.stepdefs;

import io.github.scrapery.gateway.ScraperGatewayApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ScraperGatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
