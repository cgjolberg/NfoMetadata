﻿using MediaBrowser.Common.Configuration;
using MediaBrowser.Model.Configuration;
using System.Collections.Generic;

namespace NfoMetadata.Configuration
{
    public static class ConfigurationExtension
    {
        public static XbmcMetadataOptions GetNfoConfiguration(this IConfigurationManager manager)
        {
            return manager.GetConfiguration<XbmcMetadataOptions>("xbmcmetadata");
        }
    }
}
